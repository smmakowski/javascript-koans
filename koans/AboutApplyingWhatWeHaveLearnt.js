var _; // globals

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
      var productsICanEat = [];

      /* solve using filter() & all() / any() */

      productsICanEat = products.filter(function(e, i, ar){
        var ingredients = e.ingredients;
        var containsNuts = e.containsNuts;

        return (containsNuts === false && ingredients.indexOf
          ('mushrooms') === -1);
      })

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    var sum = 0;    /* try chaining range() and reduce() */

    function range(start, end){
      var range = [];

      for (var i = start; i < end; i++) {
        range.push(i);
      }
      return range;
    }

    sum = range(1, 1000).reduce(function(acc, e){
      if (e % 3 === 0 || e % 5 === 0) {
        return acc += e;
      }
      else return acc;
    }, 0);

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */

    ingredientCount['mushrooms'] = _.chain(products).map(function(ele){
      return ele.ingredients;
    }).flatten(products).reduce(function(acc, el){
      if (el === 'mushrooms'){
        return acc += 1;
      } else {
        return acc;
      }
    }, 0).value();


    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  
  it("should find the largest prime factor of a composite number", function () {
    var isPrime = function(num){
      if (num < 2) {
        return false;
      }

      for (var i = 2; i < num; i ++) {
        if (num % i === 0){
          return false;
        }
      }

      return true;
    };

    var findLargestPrimeFactor = function(num){
      var factors = [];

      for (var i = 1; i <= num; i++) {
        if (num % i === 0) {
          factors.push(i);
        }
      }

      var primeFactors = factors.filter(function(e){
        return isPrime(e);
      });

      return primeFactors[primeFactors.length - 1];
    }

    expect(findLargestPrimeFactor(10)).toBe(5);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    var isPalindrome = function(num){
      var str = num.toString();

      if (str === str.split('').reverse().join('')) {
        return true;
      } else {
        return false;
      }
    }

    var isProductOfThreeDigitNumbers = function(num){
      for (var i = 999; i >= 100; i--){
        for (var j = 999; j >= 100; j--){
          if (i * j === num) {
            return true;
          }
        }
      }
      return false;
    }

    var findLargestPalindrome = function(){
      var largestProduct = 999 * 999;
      var smallestProduct = 100 * 100;

      for (var i = largestProduct; i >= smallestProduct; i--){
        if (isPalindrome(i) && isProductOfThreeDigitNumbers(i)) {
          return i;
        }
      }
    };

    expect(findLargestPalindrome()).toBe(906609);
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
    var isDivisibleByOneThroughTwenty = function(num) {
      var oneThroughTwenty = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

      return oneThroughTwenty.every(function(i){
        return (num % i === 0);
      });
    };

    var findSmallestDivisible = function(){
      var i = 1;
      var isDivisibleByAll = false;
      
      while (!isDivisibleByAll) {
        if (isDivisibleByOneThroughTwenty(i)) {
          return i;
        }

        i++;
      }
    };

    expect(findSmallestDivisible()).toBe(232792560);
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    // sum of squares is th sum of squares of the first n numbers; n = 4 [1,2,3,4] => [1,4,9,16] => 29;
    //  square of sums =  n = 4, [1,2,3,4] =>10 => 100;

    var getSumOfSquares = function(num){
      var numbers = [];

      for (var i = 1; i <= num; i++){
        numbers.push(i);
      }

      return numbers.map(function(ele){
        return Math.pow(ele, 2);
      }).reduce(function(acc, el){
        return acc += el;
      }, 0);
    };

    var getSquareOfSums = function(num){
      var numbers = [];

      for (var i = 1; i <= num; i++) {
        numbers.push(i);
      }

      var sum = numbers.reduce(function(acc, ele){
        return acc += ele;
      });

      return Math.pow(sum, 2);
    };

    var getDifference = function(num){
      var squareOfSums = getSquareOfSums(num);
      var sumOfSquares = getSumOfSquares(num);

      return sumOfSquares - squareOfSums;
    };

    expect(getDifference(4)).toBe(-70);
  });

  it("should find the 10001st prime", function () {
    var isPrime = function(num){
      if (num < 2) {
        return false;
      }

      for (var i = 2; i < num; i++) {
        if (num % i === 0) {
          return false;
        }
      }

      return true;
    };

    var primeCount = 0;

    var findTenThousandFirstPrime = function () {
      var i = 1;
      while (primeCount <=10002) {
        if (isPrime(i)) {
          primeCount++;
        }

        if (primeCount === 10001) {
          return i;
        }

        i++;
      }
    };

    expect(findTenThousandFirstPrime()).toBe(104743);
  });

});
