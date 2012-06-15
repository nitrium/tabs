var tMenu = function() {
		// height values for each tab block
		var h_calibracoes = 210;
		var h_ensaios = 310;
		var h_servicos = 290;
		var h_orcamentos = 265;
		
		var h_def_wrapper;
		
		$.easing.def = 'easeInOutQuart';
		
		// other controls
		var selected_button;
	
		var init = function()
		{
			h_def_wrapper = Number($('#tabs_wrapper').css('height').substr(0, 2));
			
			/*
			$('a', '.calibracoes').attr('onclick', "javascript:oTab('calibracoes');");
			$('a', '.ensaios').attr('onclick', "javascript:tMenu.oTab('ensaios');");
			$('a', '.servicos').attr('onclick', "javascript:tMenu.oTab('servicos');");
			$('a', '.orcamentos').attr('onclick', "javascript:tMenu.oTab('orcamentos');");
			*/
			
			// hides all tabs
			$('div').find('#tabs_block').each(function() {$(this).hide()}); // hack for ie7/8 with 'find'
		}
		
		var oTab = function(tab_name)
		{
			var height_compensation = Number($('#tabs_block_wrapper').css('top').substr(0, 2));
			var new_height = eval('h_' + tab_name);
			var m_duration = 500;
			
			var target_block = '#tabs_block[class|="' + tab_name + '"]'; // which block should be opened?
//alert(target_block);
			if (selected_button == undefined)
			{
				$('#tabs_block_wrapper').animate({height: new_height}, m_duration);
				$('div').find(target_block).show();
			}
			else if (selected_button == ("." + tab_name)) // same button clicked twice
			{
				tab_name = "";
				new_height = h_def_wrapper - height_compensation;
				
				$('#tabs_block_wrapper').animate({height: 1}, m_duration, 'easeOutQuart', function()
				{
					$(target_block).hide();
				});
			}
			else
			{
				var selected_block = selected_button.substr(1);
				$('#tabs_block_wrapper').animate({height: 1}, m_duration, 'easeOutQuart', function()
				{
					//$('#tabs_block[class|="' + selected_block + '"]').hide();
					$(this).find('#tabs_block[class|="' + selected_block + '"]').hide();
					$('div').find(target_block).show();
					$('#tabs_block_wrapper').animate({height: new_height}, m_duration);
				});
			}
						
			// height adjustment of wrapper div
			$('#tabs_wrapper').animate({height: new_height + height_compensation}, m_duration);
			
			// toggles selected button class
			try
			{
				$('a', selected_button).removeClass('selected');
			} catch (err) {}
			if (tab_name != "")
			{
				selected_button = "." + tab_name;
				$('a', selected_button).toggleClass('selected');
			}
			else
			{
				selected_button = undefined;
			}
			
			
		}
		
		return {
			init: init,
			oTab: oTab
		}
		
}();		

$(window).load(function() {tMenu.init();});