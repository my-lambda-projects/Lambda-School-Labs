from rest_framework.permissions import IsAuthenticated, BasePermission

class IsAuthenticatedOrCreate(IsAuthenticated):
    def has_permission(self, request, view):
        if request.method == 'POST':
            print(request.method)
            return True
        return super(IsAuthenticatedOrCreate, self).has_permission(request, view)


class IsOwnerOrReadOnly(BasePermission):
    # user = User.objects.get()
    print('check permissions')
    def has_object_permission(sel, request, view, obj):
        print(request.user)
        return obj.user == request.user