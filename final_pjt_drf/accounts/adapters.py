from allauth.account.adapter import DefaultAccountAdapter


class CustomUserAccountAdapter(DefaultAccountAdapter):

    def save_user(self, request, user, form, commit=True):
        """
        Saves a new `User` instance using information provided in the
        signup form.
        """
        from allauth.account.utils import user_field

        user = super().save_user(request, user, form, False)
        user_field(user, 'username', request.data.get('username', ''))
        user_field(user, 'nickname', request.data.get('nickname', ''))
        user_field(user, 'password1', request.data.get('password1', ''))
        user_field(user, 'password1', request.data.get('password1', ''))
        user_field(user, 'email', request.data.get('email', ''))
        user.save()
        return user