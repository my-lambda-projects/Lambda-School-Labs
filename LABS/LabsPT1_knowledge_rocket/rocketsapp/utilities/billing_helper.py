from decouple import config
import stripe
from rocketsapp.models import User

stripe.api_key = config("STRIPE_SECRET_KEY")
algorithm = 'HS256'


class SubscribeCustomer:
    def __init__(self, username, email, source):
        self.username = username
        self.email = email
        self.source = source
        self.plan_id = config("PLAN_ID")
        self.teacher = None

    def get_teacher(self):
        return User.objects.get(username=self.username)

    def customer_exists(self):
        self.teacher = self.get_teacher()
        customerID = self.teacher.customerID
        
        try:
            stripe.Customer.retrieve(id=customerID)['subscriptions']['data']
            return True

        except:
            return False

    def create_customer(self):
        self.customer = stripe.Customer.create(
            email=self.email,
            source=self.source
        )

    def create_subscription(self):
        subscription = stripe.Subscription.create(
            customer=self.customer.id,
            items=[{'plan': self.plan_id}],
        )
    
    def update_teacher(self):
        self.teacher.is_premium = True
        self.teacher.customerID = self.customer.id
        self.teacher.save(update_fields=['customerID', 'is_premium'])
