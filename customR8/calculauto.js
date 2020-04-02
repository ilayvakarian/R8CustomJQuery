$(document).ready(function(){

	var modelSpecs,
		modelPrice,
		modelSpecsHolder,
		modelPriceHolder,
		modelPriceHolderUSD;

	modelSpecsHolder = $('#modelSpecs');
	modelPriceHolder = $('#modelPriceUAH');
	modelPriceHolderUSD = $('#modelPriceUSD');

	modelPrice = 0;
	modelSpecs = ''; // описанная готовая спецификация выбора


	// сумма всех комплектаций
	function calculatePrice(){


		var modelPriceEngine = $('input[name=engine]:checked','#autoForm').val();
		var modelPriceTransmission = $('input[name=transmission]:checked','#autoForm').val();
		var modelPricePackage1 = $('input[name=active]:checked','#autoForm').val();
		var modelPricePackage2 = $('input[name=activeplus]:checked','#autoForm').val();
		
		modelPriceEngine = parseInt(modelPriceEngine);
		modelPriceTransmission = parseInt(modelPriceTransmission);
		modelPricePackage1 = parseInt(modelPricePackage1);
		modelPricePackage2 = parseInt(modelPricePackage2);

		if(isNaN (modelPricePackage1 )){
			modelPricePackage1 = 0;
		}
		if(isNaN (modelPricePackage2 )){
			modelPricePackage2 = 0;
		}

		modelPrice=modelPriceEngine+modelPriceTransmission+modelPricePackage1+modelPricePackage2;

		modelPriceHolder.text(modelPrice + ' UAH');
	};

	// добавление выбранных спецификаций
	function compileSpecs(){

		modelSpecs = $('input[name=engine]:checked + label','#autoForm').text();
		modelSpecs +=', ' + $('input[name=transmission]:checked + label','#autoForm').text();
		modelSpecs += ', ' + $('input[name=active]:checked + label','#autoForm').text();
		modelSpecs += ', ' + $('input[name=activeplus]:checked + label','#autoForm').text();
		
		// alert(modelSpecs);

		modelSpecsHolder.text(modelSpecs);
	}
	// при выборе спецификации срабатывают функции - для изменения значения
	$('#autoForm input').on('change',function(){
		calculatePrice();
		compileSpecs();
		calculateUSD();
	})
	
	// При старте страницы

	calculatePrice();
	compileSpecs();

	// функция выбора цвета
	var $carImg = $('#imgHold img');
	$('#colorSelector .colorItem').on('click',function(){

		var $imgPath = $(this).attr('data-img-path');  // this -  принимает тот элемент на который кликнули в самом colorSelector
		
		$carImg.fadeOut(100,function(){
			$carImg.attr('src',$imgPath).fadeIn(100);
		});
	});

	// получаем курс валют

	var currencyUrl = "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5"; // курсы валют для сайта
    var UahUsdRate = 0;
    $.ajax({ // ajax запрос

    	url: currencyUrl,
    	cache: false,
    	success: function (html){// передаем параметры которые получили с сервера
   		// console.log( html[0].sale);
   		UahUsdRate = html[0].sale;
   		calculateUSD();
   		}
    });
    
    function calculateUSD() {
    	var modelPriceUSD = modelPrice/UahUsdRate;
    	modelPriceHolderUSD.text(modelPriceUSD.toFixed(0) + ' USD');
    }

});

