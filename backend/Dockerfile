FROM python:3.13-slim

# Environment setup
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1 \
    SECRET_KEY=django-insecure-ch9rw474p5yvf9rj!u=m4p839mh47w@7(%j4r)n5@pw4jgz1fy \
    ADMIN_SECRET_KEY=my_super_secret_key \
    DEBUG=False \
    ALLOWED_HOSTS=localhost,127.0.0.1,* \
    DB_ENGINE=django.db.backends.mysql \
    DB_NAME=awkaf \
    DB_USER=anass \
    DB_PASSWORD=anass \
    DB_HOST=113.30.149.128 \
    DB_PORT=3306 \
    DB_UNIX_SOCKET=/opt/lampp/var/mysql/mysql.sock \
    EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend \
    EMAIL_HOST=smtp.gmail.com \
    EMAIL_PORT=587 \
    EMAIL_USE_TLS=True \
    EMAIL_HOST_USER=aminecheikh17@gmail.com \
    EMAIL_HOST_PASSWORD="gsab dwhu wvti vzes" \
    DEFAULT_FROM_EMAIL=aminecheikh17@gmail.com \
    CORS_ALLOWED_ORIGINS=http://127.0.0.1:5173,http://localhost:5173 \
    CSRF_TRUSTED_ORIGINS=http://127.0.0.1:5173,http://localhost:5173 \
    CORS_ALLOW_CREDENTIALS=True \
    JWT_ACCESS_TOKEN_LIFETIME=120 \
    JWT_REFRESH_TOKEN_LIFETIME=604800 \
    MEDIA_URL=/media/ \
    MEDIA_ROOT=media

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    default-libmysqlclient-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

# Copy dependencies first (for caching)
COPY requirements.txt .

# Install Python dependencies
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy all project files
COPY . .

# Make directories
RUN mkdir -p /app/media /app/staticfiles

# Collect static files
RUN python manage.py collectstatic --noinput || true

# Run migrations + create superuser automatically
RUN python manage.py makemigrations --noinput && \
    python manage.py migrate --noinput && \
    python manage.py shell -c "\
from django.contrib.auth import get_user_model; \
User = get_user_model(); \
User.objects.filter(username='admin').exists() or \
User.objects.create_superuser('admin', 'anass.debbaghi123@gmail.com', 'admin')"

EXPOSE 8080

CMD ["python", "manage.py", "runserver", "0.0.0.0:8080"]