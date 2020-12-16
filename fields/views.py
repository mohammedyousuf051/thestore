from django.shortcuts import render

# Create your views here.
def signup(request):
    return render(request,template_name="signup.html")

def login(request):
    return render(request, template_name="login.html")

def dashboard(request):
    return render(request,template_name="dashboard.html")

def lists(request):
    return render(request, template_name="list.html")