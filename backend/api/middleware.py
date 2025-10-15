"""
Middleware personnalisé pour la gestion sécurisée des tokens JWT
Remplace localStorage par des cookies httpOnly
"""
from django.http import JsonResponse
from django.utils.deprecation import MiddlewareMixin
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
import logging

logger = logging.getLogger(__name__)


class JWTCookieMiddleware(MiddlewareMixin):
    """
    Middleware pour gérer les tokens JWT via des cookies httpOnly
    Remplace localStorage pour une sécurité renforcée
    """
    
    def process_response(self, request, response):
        """
        Traite les réponses pour ajouter/supprimer les cookies JWT
        """
        # Si c'est une réponse JSON avec des tokens
        if (hasattr(response, 'data') and 
            isinstance(response.data, dict) and 
            response.status_code in [200, 201]):
            
            # Gérer le token d'accès
            if 'access' in response.data:
                access_token = response.data['access']
                self._set_access_cookie(response, access_token)
                # Supprimer le token de la réponse JSON
                del response.data['access']
            
            # Gérer le token de rafraîchissement
            if 'refresh' in response.data:
                refresh_token = response.data['refresh']
                self._set_refresh_cookie(response, refresh_token)
                # Supprimer le token de la réponse JSON
                del response.data['refresh']
            
            # Gérer la déconnexion
            if 'message' in response.data and 'logout' in response.data['message'].lower():
                self._clear_jwt_cookies(response)
        
        return response
    
    def _set_access_cookie(self, response, token):
        """Définit le cookie d'accès avec les bonnes options de sécurité"""
        try:
            # Valider le token
            AccessToken(token)
            
            response.set_cookie(
                'access_token',
                token,
                max_age=3600,  # 1 heure
                httponly=True,  # CRITICAL: Empêche l'accès JavaScript
                secure=True,    # HTTPS seulement
                samesite='Lax', # Protection CSRF
                path='/',
                domain=None     # Limite aux domaines autorisés
            )
            logger.info("Access token cookie set successfully")
        except (InvalidToken, TokenError) as e:
            logger.error(f"Invalid access token: {e}")
    
    def _set_refresh_cookie(self, response, token):
        """Définit le cookie de rafraîchissement avec les bonnes options de sécurité"""
        try:
            # Valider le token
            RefreshToken(token)
            
            response.set_cookie(
                'refresh_token',
                token,
                max_age=604800,  # 7 jours
                httponly=True,   # CRITICAL: Empêche l'accès JavaScript
                secure=True,     # HTTPS seulement
                samesite='Lax',  # Protection CSRF
                path='/',
                domain=None      # Limite aux domaines autorisés
            )
            logger.info("Refresh token cookie set successfully")
        except (InvalidToken, TokenError) as e:
            logger.error(f"Invalid refresh token: {e}")
    
    def _clear_jwt_cookies(self, response):
        """Supprime les cookies JWT lors de la déconnexion"""
        response.delete_cookie('access_token', path='/')
        response.delete_cookie('refresh_token', path='/')
        logger.info("JWT cookies cleared")
