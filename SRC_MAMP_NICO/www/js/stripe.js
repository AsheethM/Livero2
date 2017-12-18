var stripe = Stripe('pk_test_rgOKJ1gBjmhV12VK9Oxfj6dS');

// Create an instance of Elements
var elements = stripe.elements();

// Custom styling can be passed to options when creating an Element.
// (Note that this demo uses a wider set of styles than the guide below.)
var style = {
  base: {
    color: '#32325d',
    lineHeight: '18px',
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '16px',
    '::placeholder': {
      color: '#aab7c4'
    }
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a'
  }
};

// Create an instance of the card Element
var card = elements.create('card', {style: style});


var elementExists = document.getElementById("card-element");
console.log(elementExists);


// Add an instance of the card Element into the `card-element` <div>
card.mount('#card-element');

// Handle real-time validation errors from the card Element.
card.addEventListener('change', function(event) {
  var displayError = document.getElementById('card-errors');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
});

// Handle form submission
var form = document.getElementById('payment-form');
form.addEventListener('submit', function(event) {
  event.preventDefault();

  stripe.createToken(card).then(function(result) {
    if (result.error) {
      // Inform the user if there was an error
      var errorElement = document.getElementById('card-errors');
      errorElement.textContent = result.error.message;
    } else {
      // Send the token to your server
      
      var res;
      var card;
      var customer;
      var charge;

      $.ajax({
        url : 'http://localhost:8888/php/customer_stripe.php',
        method: 'post',
        data: {'StripeToken' : result.token.id},
        dataType: 'json',
        async : false,
        success : function (data) {
          console.log(data);
          card = data.default_source;
          customer = data.id;
          console.log('Customer Creation OK');
        },
        error : function () {
          console.log("ERROR PHP1");
        }
    });

      $.ajax({
        url : 'http://localhost:8888/php/charge_stripe.php',
        method: 'post',
        data: {'Customer' : customer},
        dataType: 'json',
        async : false,
        success : function (data) {
          console.log(data);
          charge = data.id;
          console.log('Charge OK');
        },
        error : function () {
          console.log("ERROR PHP2");
        }
    });

      $.ajax({
        url : 'http://localhost:8888/php/refund_stripe.php',
        method: 'post',
        data: {'ChargeToken' : charge},
        dataType: 'json',
        async : false,
        success : function (data) {
          console.log(data);
          console.log('Refund OK');
        },
        error : function () {
          console.log("ERROR PHP3");
        }
    });

      $.ajax({
        url : 'http://localhost:8888/php/payout_stripe.php',
        method: 'post',
        data: {'CardToken' : card},
        dataType: 'json',
        async : false,
        success : function (data) {
          console.log(data);
        },
        error : function () {
          console.log("ERROR payout_stripe");
        }
    });

    }
  });
});

//$response["t_customer"] = ;


