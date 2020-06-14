<script>
let dropdown = $('#countrydropdown .menu');

dropdown.empty();


//dropdown.prop('selectedIndex', 0);
const urltwo = 'https://goodland-1.s3.ca-central-1.amazonaws.com/country.json';

// Populate dropdown
$.getJSON(urltwo, function (data) {
  $.each(data, function (key, entry) {
 	  dropdown.append('<div class="item" data-value="'+entry.class+'"><i class="'+entry.class+' flag"></i>'+entry.name+'</div>');
 })
});

$('#countrydropdown')
  .dropdown()
;




let dropdown2 = $('#multi-select-tech-1');
dropdown2.empty();
dropdown2.prop('selectedIndex', 0);

let dropdown3 = $('#multi-select-tech-2');
dropdown3.empty();
dropdown3.prop('selectedIndex', 0);

const url = 'https://goodland-1.s3.ca-central-1.amazonaws.com/tech-dropdown-updated.json';

// Populate dropdown
$.getJSON(url, function (data) {
  $.each(data, function (key, entry) {
   dropdown2.append($('<option></option>').attr('value', entry.name).text(entry.name));
    dropdown3.append($('<option></option>').attr('value', entry.name).text(entry.name));
  })
});


$(document).ready(function(){
	$( "#entreprise" ).keyup(makeAjaxRequest);
  $( "#secondentreprise" ).keyup(makeSecondAjaxRequest);
});

function makeAjaxRequest() {
  $('#results').html('');
  if($('#entreprise .search').val().length >= 1) {
    $.ajax({
      url: 'https://autocomplete.clearbit.com/v1/companies/suggest?query='+$('#entreprise .search').val(),
      type: 'get',
      success: function(response) {
      	$.each(response, function (key, entry) {
          $('#results').append('<div class="item" data-value="'+entry.name+'" data-logo="'+entry.logo+'"><img style="width:20px; height:auto; margin-top: 0;" src="'+entry.logo+'">'+entry.name+'</div>');
        })
      }
    });
  }
}

function makeSecondAjaxRequest() {
  $('#secondresults').html('');
  if($('#secondentreprise .search').val().length >= 1) {
    $.ajax({
      url: 'https://autocomplete.clearbit.com/v1/companies/suggest?query='+$('#secondentreprise .search').val(),
      type: 'get',
      success: function(response) {
      	$.each(response, function (key, entry) {
          $('#secondresults').append('<div class="item" data-value="'+entry.name+'" data-logo="'+entry.logo+'"><img style="width:20px; height:auto; margin-top: 0;" src="'+entry.logo+'">'+entry.name+'</div>');
        })
      }
    });
  }
}

$('#entreprise')
  .dropdown({
    "clearable": true,
    onChange: function(value, text, $selectedItem) {
      // custom action
      $("#entrepriselogo").val($selectedItem.data('logo'));
    }
});

$('#secondentreprise')
	.dropdown({
    "clearable": true ,
    onChange: function(value, text, $selectedItem) {
      // custom action
      $("#secondentrepriselogo").val($selectedItem.data('logo'));
    }
}); 
  
$( ".search" ).focus(function() {
  $(this).closest('.test').html('');
});

$('#multi-select-tech-1')
  .dropdown({maxSelections: 5})
;

$('#multi-select-tech-2')
  .dropdown({maxSelections: 5})
;

$('#date-picker-debut-1').calendar({
  type: 'month'
});

$('#date-picker-debut-2').calendar({
  type: 'month'
});

$('#date-picker-end-1').calendar({
  type: 'month'
});

$('#date-picker-end-2').calendar({
  type: 'month'
});

$('#poste-1')
  .dropdown()
;
$('#poste-2')
  .dropdown()
;
$('#select-niveau-2')
  .dropdown()
;
$('#select-niveau-3')
  .dropdown()
;
$('#select-niveau-4')
  .dropdown()
;
$('#select-experiences')
  .dropdown()
;
$('#select-experiences-1')
  .dropdown()
;
$('#select-experiences-2')
  .dropdown()
;
$('#select-experiences-3')
  .dropdown()
;
$('#select-experiences-4')
  .dropdown()
;

var formdisplayed = false;
$(document).ready(function () {
		//Hide and Show
		$(".ajouterbtn").click(function(){
     $(this).hide();
      $(".secondaireform").show();
      formdisplayed = true;
    });
    $(".closesecondaireform").click(function(){
      $(".ajouterbtn").show();
      $(".secondaireform").hide();
      formdisplayed = false;
    });

	  // Checkbox and date being disabled
    $('#travailleactuellement').click(function () {
    		$('.fin').toggleClass("opacity");
        $('#date-picker-end-1').calendar('clear');
        $('#datefin').prop('disabled', function(i, v) { 
          return !v; 
        });
    });
    
    // Checkbox and date being disabled
    $('#secondtravailleactuellement').click(function () {
    		$('.secondfin').toggleClass("opacity");
        $('#date-picker-end-2').calendar('clear');
        $('#seconddatefin').prop('disabled', function(i, v) { 
          return !v; 
        });
    });
});

$.fn.form.settings.rules.adminLevel = function(value) {
  return (value || !formdisplayed )? true : false;
};

$.fn.form.settings.rules.customrule = function(value) {
	if($('#travailleactuellement').val() ){
  	return value? true: false;
  }
  
  if( !$('#travailleactuellement').val() ){
  	return true;
  }
  
  return false;
};

$.fn.form.settings.rules.secondcustomrule = function(value) {
  if(formdisplayed){
    if($('#secondtravailleactuellement').val() ){
      return value? true: false;
    }
		else if( !$('#secondtravailleactuellement').val() ){
      return true;
    }
    else{
    	return false
    }
  }
  return true;
};

var editor3 = new Quill('#editor-container-3', {
    modules: { 
      toolbar: true
    },
    theme: 'snow'
  });
  $.fn.form.settings.rules.squillvalidation3 = function(value) {
    var editorValidation3 = true;
    if ((editor3.getContents()['ops'] || []).length !== 1 || editor3.getText().trim().length === 0) { 
    	editorValidation3 = false;
    }
  return editorValidation3;
};
var editor4 = new Quill('#editor-container-4', {
    modules: { 
      toolbar: true
    },
    theme: 'snow'
  });
  $.fn.form.settings.rules.squillvalidation4 = function(value) {
    var editorValidation4 = true;
    if ((editor4.getContents()['ops'] || []).length !== 1 || editor4.getText().trim().length === 0) { 
    	editorValidation4 = false;
    }
  return editorValidation4;
};
$("#wf-form-Experiences-Candidats").form({
    fields: {
     	poste: {
          identifier: 'poste',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please select a gender'
            }
          ]
      },
      entreprise: {
          identifier: 'entreprise',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please select a gender'
            }
          ]
      },
          	realisation: {
            identifier: 'realisation',
            rules: [
            	{
                type   : 'squillvalidation3[value]',
                prompt : 'Please select a gender'
              }
            ]
      },
                	realisation2: {
            identifier: 'realisation2',
            rules: [
            	{
                type   : 'squillvalidation4[value]',
                prompt : 'Please select a gender'
              }
            ]
      },
      datedebut: {
          identifier: 'datedebut',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please select a gender'
            }
          ]
      },
      datefin: {
          identifier: 'datefin',
          rules: [
            {
              type   : 'customrule[value]',
              prompt : 'Please select a gender'
            }
          ]
      },
      tech: {
          identifier: 'tech',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please select a gender'
            }
          ]
      },
      accomplissements: {
          identifier: 'accomplissements',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please select a gender'
            }
          ]
      },
      secondposte: {
          identifier: 'secondposte',
          rules: [
            {
              type   : 'adminLevel[value]',
              prompt : 'Please select a gender'
            }
          ]
      },
      secondentreprise: {
          identifier: 'secondentreprise',
          rules: [
            {
              type   : 'adminLevel[value]',
              prompt : 'Please select a gender'
            }
          ]
      },
      seconddatedebut: {
          identifier: 'seconddatedebut',
          rules: [
            {
              type   : 'adminLevel[value]',
              prompt : 'Please select a gender'
            }
          ]
      },
      seconddatefin: {
          identifier: 'seconddatefin',
          rules: [
            {
              type   : 'secondcustomrule[value]',
              prompt : 'Please select a gender'
            }
          ]
      },
      secondtech: {
          identifier: 'secondtech',
          rules: [
            {
              type   : 'adminLevel[value]',
              prompt : 'Please select a gender'
            }
          ]
      },
      secondaccomplissements: {
          identifier: 'secondaccomplissements',
          rules: [
            {
              type   : 'adminLevel[value]',
              prompt : 'Please select a gender'
            }
          ]
      }
    }
});

</script>

<script>
//Load memberstack 
MemberStack.onReady.then(function(member) {
	//Form submission function
  $("#wf-form-Experiences-Candidats").submit(function(e){
  // Populate hidden form on submit
var about3 = document.querySelector('textarea[name=realisation]');
about3.value = JSON.stringify(editor3.getContents());
var about4 = document.querySelector('textarea[name=realisation2]');
about4.value = JSON.stringify(editor4.getContents());
    //Check if form is valid
    if( $('#wf-form-Experiences-Candidats').form('is valid')) {
       //update field
        member.updateProfile({
          "last-step-completed": "Experiences"
        }, false)
    }
  });
})
</script>
