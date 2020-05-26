/*******************************************
			GSAP ANIMATIONS
*******************************************/

TweenMax.to(".overlay2 h1", 2, {
	opacity: 0,
	y: -60,
	ease: Expo.easeInOut
})

TweenMax.to(".overlay2 span", 2, {
	delay: .3,
	opacity: 0,
	y: -60,
	ease: Expo.easeInOut
})

TweenMax.to(".overlay2", 2, {
	delay: 1,
	left: "-100%",
	ease: Expo.easeInOut
})

TweenMax.from(".ellipse-container", 1, {
	delay: 2,
	opacity: 0,
	ease: Expo.easeInOut
})

TweenMax.from(".blue", 1, {
	delay: 3.5,
	opacity: 0,
	ease: Expo.easeInOut
})

TweenMax.from(".circle1", 1, {
	delay: 2.4,
	opacity: 0,
	ease: Expo.easeInOut
})

TweenMax.from(".circle2", 1, {
	delay: 2.6,
	opacity: 0,
	ease: Expo.easeInOut
})

TweenMax.from(".logo", 1, {
	delay: 3,
	opacity: 0,
	y: -100,
	ease: Expo.easeInOut
})

TweenMax.from(".logo-mobile", 1, {
	delay: 2.2,
	opacity: 0,
	y: -100,
	ease: Expo.easeInOut
})

TweenMax.from(".text-global, .title", 1, {
	delay: 3,
	opacity: 0,
	x: 200,
	ease: Expo.easeInOut
})

TweenMax.from(".text-global p", 1, {
	delay: 3.2,
	opacity: 0,
	x: 200,
	ease: Expo.easeInOut
})

TweenMax.from(".weatherBtn", 1, {
	delay: 2.8,
	opacity: 0,
	x: 370,
	ease: Expo.easeInOut
})

TweenMax.to(".container2", 1, {
	delay: 3.6,
	opacity: 1,
	x: 200,
	ease: Expo.easeInOut
})

TweenMax.to(".container2-mobile", 1, {
	delay: 2.4,
	opacity: 1,
	x: -634,
	ease: Expo.easeInOut
})


/*******************************************
				SMOOTH SCROLL
*******************************************/

$('.news-container a').on('click', function(e) {
	console.log(this.hash)
	if(this.hash !== '') {
		e.preventDefault();

		const hash = this.hash;

		$('html, body').delay(2000).animate(
		{
			scrollTop: $(hash).offset().top
		},
			800
		);
	}
});

/****************************************
      			WEATHER
****************************************/

/***********************
   OPEN & CLOSE MODAL
***********************/

const openModalButtons = document.querySelectorAll('[data-modal-target');
const closeModalButtons = document.querySelectorAll('[data-close-button');
const overlay = document.getElementById('overlay');

openModalButtons.forEach(button => {
	button.addEventListener('click', () => {
		const modal = document.querySelector(button.dataset.modalTarget)
		openModal(modal)
	})
})

overlay.addEventListener('click', () => {
	const modals = document.querySelectorAll('.modal.active')
	modals.forEach(modal => {
		closeModal(modal)
	})
})

closeModalButtons.forEach(button => {
	button.addEventListener('click', () => {
		const modal = button.closest('.modal')
		closeModal(modal)
	})
})

function openModal(modal) {
	if (modal == null) return
		modal.classList.add('active')
		overlay.classList.add('active')
}  

function closeModal(modal) {
	if (modal == null) return
		modal.classList.remove('active')
		overlay.classList.remove('active')
		clearModal()
}

function clearModal() {
	document.querySelector(".city").innerHTML = '';
	document.querySelector(".temp").innerHTML = '';
	document.querySelector(".date").innerHTML = '';
	document.querySelector(".weather").innerHTML = '';
	document.querySelector(".hi-low").innerHTML = '';
}


/**********************
POPULATE WEATHER MODAL
**********************/

		const api = {

			key:"8c9f99e10919f779dea2ede91d1044c0",
			base: "https://api.openweathermap.org/data/2.5"
		}

		const searchbox = document.querySelector('.search-box');
		searchbox.addEventListener('keypress', setQuery);

// get value from weather seach box and fade in text from weather search
		const textFade = document.querySelector('.city-date-temp');

		function setQuery(evt) {
			if (evt.keyCode == 13){
			getResults(searchbox.value);
			
			textFade.classList.add('fadeInWeather');
			setTimeout(removeFadeClass, 1600);
			}
		}

		function removeFadeClass() {
			textFade.classList.remove('fadeInWeather');
			}

/****************
 GET WEATHER API
****************/

		function getResults(query) {
			fetch(`${api.base}/weather?q=${query}&units=imperial&APPID=${api.key}`).then(weather => {
				return weather.json();
			}).then(displayResults);
		}

		function displayResults(weather) {
			console.log(weather);
			let city = document.querySelector('.city');
			
			city.innerText = `${weather.name}, ${weather.sys.country}`;

			searchbox.value = '';

			let now = new Date();
			let date = document.querySelector('.date');
			date.innerText = dateBuilder(now);

			let temp = document.querySelector('.temp');
			temp.innerHTML = `${Math.round(weather.main.temp)}<span>&#8457</span>`;

			let weather_el = document.querySelector('.weather');
			weather_el.innerText = weather.weather[0].main;

			let hilow = document.querySelector('.hi-low');
			hilow.innerHTML = `Hi ${Math.round(weather.main.temp_max)}<span>&#8457</span> /  Low ${Math.round(weather.main.temp_min)}<span>&#8457</span>`;
		}

		function dateBuilder(d) {
			let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", "January"];

			let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

			let day = days[d.getDay()];
			let date = d.getDate();
			let month = months[d.getMonth()];
			let year = d.getFullYear();

			return `${day} ${date} ${month} ${year}`;
		}

/**********************************
               NEWS 
**********************************/


			// get keyword from input then clear input

		document.getElementById('getPosts').addEventListener('click', getValue);

		document.getElementById('getPosts').addEventListener('click', getPosts);


		document.getElementById('getPostsMobile').addEventListener('click', getValue);
		document.getElementById('getPostsMobile').addEventListener('click', getPosts);



		document.getElementById('getPosts').addEventListener('click', clearNewsInput);

		function clearNewsInput() {
			document.getElementById('key').value = '';
		}	

		function getValue(){

			keyword = document.getElementById('key').value;
			console.log(keyword);

			lan = document.getElementById('lanSelect').selectedIndex;
			language = document.getElementsByTagName('option')[lan].value;
		
		 	search = 'https://api.currentsapi.services/v1/search?' + 'keywords=' + `${keyword}` +'&language=' + `${language}` + '&' + 
            'apiKey=8lSgNp0lJ_IbaRvKJl_bDLUIK2gWuMCHihvphYNT68_zF_4s';
		}

		function getPosts(){
    		fetch(`${search}`)
        	.then((res) => res.json())
        	.then((data) => {
            console.log(data)
            //https://currentsapi.services/en/docs/   (currents api documentation)
            let output = '<h4 id="search-results">Search Results</h4>';

            console.log(output);

				data.news.forEach(function(article){
					 output += `
				
							<ul class='list-group'>
								<div class="list-wrapper">
									<li class='list-group-item'><img id="newsImage" src='${article.image}' alt="No Image Available" width='200'; height='150'>
									</li>
										<li class='list-group-item'>
										<span class="news-span" style="color:red">Author:</span> ${article.author},<br> <span class="news-span" style="color:red">Published: </span>${article.published} ${article.title}<br> <span class="news-span" style="color:red">Description: </span>${article.description}<a href=" ${article.url}" target="_blank">Read More</a>
										</li>
									</div>
								</ul>`;

		});

				document.getElementById('output').innerHTML = output;

				if(newsImage.src == 'None') {
				newsImage.src = "images/subImage.jpeg";
			}
			
		})				
        	
      }

      function fadeInNews() {
      	const fadeIn = document.getElementById('output');
      	fadeIn.classList.add('fadeInNews');

      	console.log('it is working');
      }


/**********************************
        MOBILE NEWS 
**********************************/


			// get keyword from input then clear input

		document.getElementById('getPostsMobile').addEventListener('click', getValueMobile);

		document.getElementById('getPostsMobile').addEventListener('click', getPostsMobile);

		document.getElementById('getPosts').addEventListener('click', clearNewsInput);

		function clearNewsInput() {
			document.getElementById('keyMobile').value = '';
		}	

		function getValueMobile(){

			keywordMobile = document.getElementById('keyMobile').value;
			console.log(keyword);

			lanMobile = document.getElementById('lanSelectMobile').selectedIndex;

			languageMobile = document.getElementsByClassName('optionMobile')[lanMobile].value;
		
		 	search = 'https://api.currentsapi.services/v1/search?' + 'keywords=' + `${keywordMobile}` +'&language=' + `${languageMobile}` + '&' + 
            'apiKey=8lSgNp0lJ_IbaRvKJl_bDLUIK2gWuMCHihvphYNT68_zF_4s';
            console.log(search);
		}

		function getPostsMobile(){
    		fetch(`${search}`)
        	.then((res) => res.json())
        	.then((data) => {
            console.log(data)
            //https://currentsapi.services/en/docs/   (currents api documentation)
            let output = '<h4 id="search-results">Search Results</h4>';

            console.log(output);


				data.news.forEach(function(article){
					 output += `
				
							<ul class='list-group'>
								<div class="list-wrapper">
									<li class='list-group-item'><img id="newsImage" src='${article.image}' alt="No Image Available" width='200'; height='150'>
									</li>
										<li class='list-group-item'>
										<span class="news-span" style="color:red">Author:</span> ${article.author},<br> <span class="news-span" style="color:red">Published: </span>${article.published} ${article.title}<br> <span class="news-span" style="color:red">Description: </span>${article.description}<a href=" ${article.url}" target="_blank">Read More</a>
										</li>
									</div>
								</ul>`;

		});

				document.getElementById('output').innerHTML = output;

				if(newsImage.src == 'None') {
				newsImage.src = "images/subImage.jpeg";
			}
			
		})				
        	
      }