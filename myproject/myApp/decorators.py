from django.contrib.auth.decorators import user_passes_test

def master_required(view_func):
    return user_passes_test(lambda u: u.groups.filter(name='master').exists())(view_func)
