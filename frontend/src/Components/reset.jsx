import React from 'react'

export const reset = () => {
  return (
    <div>

        <h2> Reset Your Password</h2>
    <p>Hello ,</p>
    <p>Click the button below to reset your password:</p>
    <a class="button" href="{{ reset_link }}">Reset Password</a>
    <p>If you didn’t request this, you can ignore this email.</p>
    </div>
  )
}
