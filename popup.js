(function() {

	"use strict"
	var serverUrl='http://localhost:3000/response.php';
	var popup = {

		tab: [],	
		statusDisplay: null,

		init: function() {
			this.displayData();			
		},

		displayData: function() {
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {sendInfo: true}, function(response) {

					// console.log(response);

					var name = response[0];
					var headline = response[1];
					var competences = response[2];
					var linkedin = response[3];
					var tel = response[4];
					var email = response[5];

					document.getElementById('name').value = name;
					document.getElementById('headline').value = headline;
					document.getElementById('mail').value = email;
					document.getElementById('competence').value = competences;
					document.getElementById('linkedin').value = linkedin;
					document.getElementById('tel').value = tel;
				});
			});
		},

		postJson: function(event) {
			event.preventDefault();
			var response={
				name:document.getElementById('name').value ,
				headline:document.getElementById('headline').value ,
				email:document.getElementById('mail').value  ,
				competences:document.getElementById('competence').value  ,
				linkedin:document.getElementById('linkedin').value  ,
				tel:document.getElementById('tel').value  
			};
			axios({
				method: 'POST',
				url:serverUrl,
				data:response

			})
			.then(function (data) {
				console.log(data);
			})
			.catch(function (error) {
				console.log(error);
			});

		},

		toLoad: function() {

			window.addEventListener('load', function(e) {

				popup.statusDisplay = document.getElementById('status-display');

				var saveBtn = document.getElementById('add');
				saveBtn.addEventListener('submit', popup.postJson);
			});
		}
	}

	popup.init();
	popup.toLoad();

})();

