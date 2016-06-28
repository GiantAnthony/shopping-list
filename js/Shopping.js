$(document).ready(function(){

	var doCount = 3;
	var doneCount = 1;
	updateCount();
/*.sortable is to move the items around on the list */
	setFocus();
	$('#list').sortable();

	$("form").submit(function(event){
		
		event.preventDefault();

		var newItem = $.trim($('#newItem').val());
		if (newItem == '') {
			setFocus();
		} else{
			addItem(newItem);
		};
		
	});


	/* Check off the items */
	$('#list').on('click', 'li.listitem', checkoff);

	/* Delete the item */
	$('#list').on('click', 'div.delete', deleteItem);
	

	/* Delete Function */
	function deleteItem(){
		if($(this).parent().hasClass("checked")) {
			doneCount--;
			updateCount();
			$(this).parent().slideUp('slow', function(){
				$(this).remove();
			});
			return false;
		} else {
			doCount--;
			updateCount();
			$(this).parent().slideUp('slow', function(){
				$(this).remove();
			});
			return false;
		};
    	
	}

	/*Check off Function */
	function checkoff(){
		if($(this).hasClass("checked")) {
			$(this).slideUp('slow', function(){
				$(this).slideDown('slow').prependTo('#list');
			});
			doCount++;
			doneCount--;
			updateCount();
		} 
		/*this is when you click on an item and it shows up at the top
		but if it crossed out it shows up at the bottom */
		else {
			$(this).slideUp('slow', function(){
				$(this).slideDown('slow').appendTo('#list');
			});			

			doneCount++;
			doCount--;
			updateCount();
		}
		$(this).toggleClass("checked");
		
	}

	/* Add the new item to the list and increase the count */
	function addItem(item) {
		doCount++;
		updateCount();
		$('<li class="listitem"><span class="item">' + item + '</span><div class="delete"></div></li>').hide().prependTo('#list').slideDown('slow');
		setFocus();
	}

	/* Clear and Set focus to the inputbox */
	function setFocus() {
		$('#newItem').val('');
		document.getElementById("newItem").focus();
	}

	/* Update the DO, DONE & TOTAL counts */
	function updateCount() {
		$('#do').text(doCount);
		$('#done').text(doneCount);
		$('#total').text(doCount + doneCount);
	}
});