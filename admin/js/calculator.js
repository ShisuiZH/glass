// Get a reference to the storage service, which is used to create refere
$(function () {
	$('.addStr').click(function () {
		if ($(this).closest('div.p').find('.addStr').length > 25) return false;
		var c = $(this).parent().clone(true);
		c.find('input[name^=zenkovka]').attr('name', 'zenkovka_' + $(this).closest('div.p').find('input[name^=zenkovka]').length);
		c.find('input[id^=zenkovka]').attr('id', 'zenkovka_' + $(this).closest('div.p').find('input[id^=zenkovka]').length);
		c.find('label[id^=label_zenkovka]').attr('id', 'label_zenkovka_' + $(this).closest('div.p').find('label[id^=label_zenkovka]').length);
		c.find('input[id^=diam]').attr('id', 'diam_' + $(this).closest('div.p').find('input[id^=diam]').length);
		c.find('input[id^=count]').attr('id', 'count_' + $(this).closest('div.p').find('input[id^=count]').length);

		c.find('input[id^=otver_st]').attr('id', 'otver_st_' + $(this).closest('div.p').find('input[id^=otver_st]').length);
		c.find('input[id^=otver_st_]').val(0);

		c.find('output[id^=st_otver_]').attr('id', 'st_otver_' + $(this).closest('div.p').find('output[id^=st_otver_]').length);
		c.find('output[id^=st_otver_]').val(0);
		c.find('input[id^=diam]').val("");
		c.find('input[id^=count]').val("");
		c.find('input[type=text]').val('').removeClass('errinp');
		c.find('input[type=checkbox]').removeAttr('checked');

		c.appendTo($(this).closest('div.p'));

		$(this).closest('div.p').find('.delStr:first,.delStr:last').removeAttr('disabled');
	});
	$('.delStr').click(function () {
		var p = $(this).closest('div.p');
		$(this).parent().remove();
		if ($('.delStr').length == 1) $('.delStr').attr('disabled', true);
		p.find('input[name^=zenkovka]').each(function (i, o) {
			$(this).attr('name', 'zenkovka_' + i);

		});
	});
	kalkulyator();
});



function setElementOpacity(sElemId, nOpacity) {
	var opacityProp = getOpacityProperty();
	var elem = document.getElementById(sElemId);

	if (!elem || !opacityProp) return; // Г…Г±Г«ГЁ Г­ГҐ Г±ГіГ№ГҐГ±ГІГўГіГҐГІ ГЅГ«ГҐГ¬ГҐГ­ГІ Г± ГіГЄГ Г§Г Г­Г­Г»Г¬ id ГЁГ«ГЁ ГЎГ°Г ГіГ§ГҐГ° Г­ГҐ ГЇГ®Г¤Г¤ГҐГ°Г¦ГЁГўГ ГҐГІ Г­ГЁ Г®Г¤ГЁГ­ ГЁГ§ ГЁГ§ГўГҐГ±ГІГ­Г»Гµ ГґГіГ­ГЄГ¶ГЁГЁ Г±ГЇГ®Г±Г®ГЎГ®Гў ГіГЇГ°Г ГўГ«ГҐГ­ГЁГї ГЇГ°Г®Г§Г°Г Г·Г­Г®Г±ГІГјГѕ

	if (opacityProp == "filter")  // Internet Exploder 5.5+
	{
		nOpacity *= 100;

		// Г…Г±Г«ГЁ ГіГ¦ГҐ ГіГ±ГІГ Г­Г®ГўГ«ГҐГ­Г  ГЇГ°Г®Г§Г°Г Г·Г­Г®Г±ГІГј, ГІГ® Г¬ГҐГ­ГїГҐГ¬ ГҐВё Г·ГҐГ°ГҐГ§ ГЄГ®Г«Г«ГҐГЄГ¶ГЁГѕ filters, ГЁГ­Г Г·ГҐ Г¤Г®ГЎГ ГўГ«ГїГҐГ¬ ГЇГ°Г®Г§Г°Г Г·Г­Г®Г±ГІГј Г·ГҐГ°ГҐГ§ style.filter
		var oAlpha = elem.filters['DXImageTransform.Microsoft.alpha'] || elem.filters.alpha;
		if (oAlpha) oAlpha.opacity = nOpacity;
		else elem.style.filter += "progid:DXImageTransform.Microsoft.Alpha(opacity=" + nOpacity + ")"; // Г„Г«Гї ГІГ®ГЈГ® Г·ГІГ®ГЎГ» Г­ГҐ Г§Г ГІГҐГ°ГҐГІГј Г¤Г°ГіГЈГЁГҐ ГґГЁГ«ГјГІГ°Г» ГЁГ±ГЇГ®Г«ГјГ§ГіГҐГ¬ "+="
	}
	else // Г„Г°ГіГЈГЁГҐ ГЎГ°Г ГіГ§ГҐГ°Г»
		elem.style[opacityProp] = nOpacity;
}

function getOpacityProperty() {
	if (typeof document.body.style.opacity == 'string') // CSS3 compliant (Moz 1.7+, Safari 1.2+, Opera 9)
		return 'opacity';
	else if (typeof document.body.style.MozOpacity == 'string') // Mozilla 1.6 ГЁ Г¬Г«Г Г¤ГёГҐ, Firefox 0.8 
		return 'MozOpacity';
	else if (typeof document.body.style.KhtmlOpacity == 'string') // Konqueror 3.1, Safari 1.1
		return 'KhtmlOpacity';
	else if (document.body.filters && navigator.appVersion.match(/MSIE ([\d.]+);/)[1] >= 5.5) // Internet Exploder 5.5+
		return 'filter';

	return false; //Г­ГҐГІ ГЇГ°Г®Г§Г°Г Г·Г­Г®Г±ГІГЁ
}

function getCheckedValue(radioObj) {
	if (!radioObj)
		return "";
	var radioLength = radioObj.length;
	if (radioLength == undefined)
		if (radioObj.checked)
			return radioObj.value;
		else
			return "";
	for (var i = 0; i < radioLength; i++) {
		if (radioObj[i].checked) {
			return radioObj[i].value;
		}
	}
	return "";
}

function setCheckedValue(radioObj, newValue) {
	if (!radioObj)
		return;
	var radioLength = radioObj.length;
	if (radioLength == undefined) {
		radioObj.checked = (radioObj.value == newValue.toString());
		return;
	}
	for (var i = 0; i < radioLength; i++) {
		radioObj[i].checked = false;
		if (radioObj[i].value == newValue.toString()) {
			radioObj[i].checked = true;
		}
	}
}
function ser_calc() {
	var ser = "";

	ser += "&name_material=" + document.getElementById('type').options[document.getElementById('type').selectedIndex].innerHTML;
	ser += "&st_rezka=" + document.getElementById('st_rezka').innerHTML;


	ser += "&view_kromka=" + document.getElementById('st_kromka').innerHTML;
	ser += "&view_facet=" + document.getElementById('st_facet').innerHTML;
	ser += "&view_otver=" + document.getElementById('st_otv').innerHTML;
	ser += "&view_vyrez=" + document.getElementById('st_vyrez').innerHTML;
	ser += "&view_zakalka=" + document.getElementById('st_zakalka').innerHTML;
	ser += "&view_pesok=" + document.getElementById('st_pesok').innerHTML;
	ser += "&view_gravir=" + document.getElementById('st_gravir').innerHTML;
	ser += "&view_plenka=" + document.getElementById('st_plenka').innerHTML;
	ser += "&view_zamer=" + document.getElementById('st_zamer').innerHTML;
	ser += "&view_dostavka=" + document.getElementById('st_dostavka').innerHTML;


	ser += "&st_itogo=" + document.getElementById('st_itogo').innerHTML;







	return ser;

}
function kalkulyator() {
	var rezka = 1;
	var cena = document.getElementById('type').options[document.getElementById('type').selectedIndex].value;
	var id_material = document.getElementById('type').selectedIndex;
	//document.getElementById('id_material').value=id_material;


	var id_kromka = getCheckedValue(document.forms['calc'].elements['kromka10']);

	// РѕРє
	var shlif_pryam = [40, 55, 60, 65, 120, 150, 220, 240, 300];
	var mm_material = [2, 4, 5, 6, 8, 10, 12, 15, 19, 4, 6, 8, 10, 12, 15, 19, 4, 5, 6, 8, 10, 4, 5, 6, 8, 10, 4, 5, 6, 8, 6, 6, 4, 4, 6, 8, 10, 12, 6, 8, 10, 12, 4, 5, 6, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
	// РЎС‚РµРєР»Рѕ Р»РёСЃС‚РѕРІРѕРµ РїРѕР»РёСЂРѕРІР°РЅРЅРѕРµ / ??? / РЎС‚РµРєР»Рѕ С‚РѕРЅРёСЂРѕРІР°РЅРЅРѕРµ Р‘Р РћРќР—Рђ, РЎР•Р РћР• / РЎС‚РµРєР»Рѕ СЃР°С‚РёРЅРёСЂРѕРІР°РЅРЅРѕРµ РњРђРўРћР’РћР• / ???
	var zakalka = [0, 420, 450, 500, 750, 800, 1050, 1350, 2100, 330, 450, 600, 650, 950, 1150, 1850, 480, 500, 600, 770, 850, 520, 550, 650, 850, 880, 420, 450, 550, 700];
	var mm = mm_material[id_material];
	//РѕС‚ 300 СЂ
	var shlif_kriv = [300, 300, 300, 300, 300, 300, 300, 300, 300]; //var shlif_kriv =[150,150,165,180,255,270,465,540,690];
	// РѕРє
	var shlif45 = [80, 110, 140, 160, 200, 280, 700, 770, 900];
	// РїРѕР»РёСЂРѕРІРєР° РїСЂСЏРјР°СЏ
	var polir_pryam = [80, 110, 140, 160, 200, 280, 700, 770, 900];
	//РѕС‚ 500 СЂ
	var polir_kriv = [500, 500, 500, 500, 500, 500, 500, 500, 500]; //var polir_kriv=[240,240,247,255,465,480,900,1005,1380];
	// РѕРє
	var polir45 = [185, 280, 280, 300, 370, 500, 850, 1150, 1500];

	var a = parseFloat(document.getElementById('a').value);
	var b = parseFloat(document.getElementById('b').value);
	var n = parseFloat(document.getElementById('n').value);
	if (n < 1) { n = 1; document.getElementById('n').value = n; }
	if (a < 1) { a = 1; document.getElementById('a').value = a; }
	if (b < 1) { b = 1; document.getElementById('b').value = b; }

	var ka = 1;
	var kb = 1;
	var id_mm;
	var color = ['#7979a9', '#0A0577'];

	for (var j = 0; j < 9; ++j) { if (mm_material[j] == mm) id_mm = j; }

	var kromka = 0;

	if (document.getElementById('t1').checked)
		var k_form = document.getElementById('t1').value;
	else var k_form = 1.3;

	var id_form = getCheckedValue(document.forms['calc'].elements['type10']);

	ss = a / 1000 * b / 1000 * n;
	rezka = Math.round(ss * cena * k_form / n) * n;





	if (a < 60) { ka = 2.5; }
	else if (a < 150) { ka = 2; }
	else if (a < 200) { ka = 1.5; }
	else if (a > 2000 && a < 2300) { ka = 1.3; }
	else if (a >= 2300 && a < 2600) { ka = 1.5; }
	else if (a >= 2600 && a < 3210) { ka = 2; }
	else if (a >= 3210 && a <= 6000) { ka = 2.5; }
	else if (a > 6000) { ka = 100; }
	else { ka = 1; }

	if (b < 60) { kb = 2.5; }
	else if (b < 150) { kb = 2; }
	else if (b < 200) { kb = 1.5; }
	else if (b > 2000 && b < 2300) { kb = 1.3; }
	else if (b >= 2300 && b < 2600) { kb = 1.5; }
	else if (b >= 2600 && b < 3210) { kb = 2; }
	else if (b >= 3210 && b <= 6000) { kb = 2.5; }
	else if (b > 6000) { kb = 100; }
	else { kb = 1; }

	ka = (ka > kb) ? ka : kb;

	var k_triplex = 1;
	if (id_material >= 34 && id_material <= 41) {
		k_triplex = 2;
		//    document.getElementById('t7').disabled = true;setElementOpacity('img7',0.5);
		//    document.getElementById('t8').disabled = true;setElementOpacity('img8',0.5);
		//    document.getElementById('t11').disabled = true;setElementOpacity('img11',0.5);
		//    document.getElementById('t12').disabled = true;setElementOpacity('img12',0.5);
		//    document.getElementById('t17').disabled = true;setElementOpacity('img17',0.5);
	}
	else if (id_material == 30 || id_material == 31) {
		for (var j = 7; j < 18; j++) {
			//    document.getElementById('t'+j).disabled = true;setElementOpacity('img'+j,0.5);

		}
	}
	else {
		for (var j = 7; j < 18; j++) {
			//    document.getElementById('t'+j).disabled = false;setElementOpacity('img'+j,1);

		}
	}

	if (n > 1) document.getElementById('st_rezka0').innerHTML = n + " Гµ " + rezka / n + " Г°ГіГЎ.=";
	else document.getElementById('st_rezka0').innerHTML = "";
	/*----------------------  5  ---------------------------*/

	if (id_material == 0 || id_material == 32 || id_material == 33) {
		document.getElementById('label4').style.color = color[0];
		document.getElementById('kromka_4').disabled = true;
		document.getElementById('label5').style.color = color[0];
		document.getElementById('kromka_5').disabled = true;

	}
	else {
		document.getElementById('label4').style.color = color[1];
		document.getElementById('kromka_4').disabled = false;
		document.getElementById('label5').style.color = color[1];
		document.getElementById('kromka_5').disabled = false;

	}

	if (id_material == 0) {
		document.getElementById('label3').style.color = color[0];
		document.getElementById('kromka_3').disabled = true;
	}
	else {
		document.getElementById('label3').style.color = color[1];
		document.getElementById('kromka_3').disabled = false;
	}

	if (id_material == 30 || id_material == 31) {
		document.getElementById('view_kromka').checked = false;
		document.getElementById('view_kromka').disabled = true;
		document.getElementById('tr_kromka0').style.color = color[0];
	}
	else { document.getElementById('view_kromka').disabled = false; document.getElementById('tr_kromka0').style.color = color[1]; }

	if (document.getElementById('view_kromka').checked) {

		document.getElementById('tr_kromka1').style.display = ""; document.getElementById('tr_kromka2').style.display = "";

		if (id_kromka == 2) {
			if (id_form < 7) { kromka = (a + b) * 2 / 1000 * shlif_pryam[id_mm] * ka; }
			else if (id_form < 9) { kromka = (a + b) / 1000 * shlif_pryam[id_mm] * ka + (a + b) / 1000 * shlif_kriv[id_mm] * ka; }
			else if (id_form < 13) { kromka = (a + b) * 2 / 1000 * shlif_kriv[id_mm] * ka; }
			else if (id_form < 15) { kromka = (a + b) * 2 / 1000 * shlif_pryam[id_mm] * ka + 4 * 50; }
			else if (id_form < 16) { kromka = (a + b) * 2 / 1000 * shlif_pryam[id_mm] * ka + 50; }
			else if (id_form < 17) { kromka = (a + b) * 2 / 1000 * shlif_pryam[id_mm] * ka + 100; }
			else { kromka = (a + b) / 1000 * shlif_pryam[id_mm] * ka + (a + b) / 1000 * shlif_kriv[id_mm] * ka + 150; }
		}
		if (id_kromka == 1) {
			if (id_form < 7) { kromka = (a + b) * 2 / 1000 * polir_pryam[id_mm] * ka; }
			else if (id_form < 9) { kromka = (a + b) / 1000 * polir_pryam[id_mm] * ka + (a + b) / 1000 * polir_kriv[id_mm] * ka; }
			else if (id_form < 13) { kromka = (a + b) * 2 / 1000 * polir_kriv[id_mm] * ka; }
			else if (id_form < 15) { kromka = (a + b) * 2 / 1000 * polir_pryam[id_mm] * ka + 4 * 50; }
			else if (id_form < 16) { kromka = (a + b) * 2 / 1000 * polir_pryam[id_mm] * ka + 50; }
			else if (id_form < 17) { kromka = (a + b) * 2 / 1000 * polir_pryam[id_mm] * ka + 100; }
			else { kromka = (a + b) / 1000 * polir_pryam[id_mm] * ka + (a + b) / 1000 * polir_kriv[id_mm] * ka + 150; }
		}
		if (id_kromka == 3 && id_form < 7) { kromka = (a + b) * 2 / 1000 * shlif45[id_mm] * ka; }
		if (id_kromka == 4 && id_form < 7) { kromka = (a + b) * 2 / 1000 * polir45[id_mm] * ka; }

		kromka = Math.round(kromka);
		kromka *= n;
		if (n > 1) document.getElementById('st_kromka0').innerHTML = n + " Гµ " + kromka / n + " Г°ГіГЎ.=";
		else document.getElementById('st_kromka0').innerHTML = "";
	}
	else {
		document.getElementById('tr_kromka1').style.display = "none";
		document.getElementById('tr_kromka2').style.display = "none";

		setCheckedValue(document.forms['calc'].elements['kromka10'], "0");
		kromka = 0;
	}


	/*-----------------------  6  ----------------------------*/
	var st_facet = 0;
	var st_facet1 = 0;
	var st_facet2 = 0;


	if (id_material == 0 || (id_material >= 32 && id_material <= 41) || id_material == 30 || id_material == 31 || id_form > 6) { document.getElementById('view_facet').checked = false; document.getElementById('view_facet').disabled = true; document.getElementById('tr_facet0').style.color = color[0]; }
	else { document.getElementById('view_facet').disabled = false; document.getElementById('tr_facet0').style.color = color[1]; }



	if (document.getElementById('view_facet').checked) {
		document.getElementById('tr_facet1').style.display = ""; document.getElementById('tr_facet2').style.display = ""; document.getElementById('tr_facet3').style.display = "";

		var facet1 = parseFloat(document.getElementById('facet1').value);
		var facet2 = parseFloat(document.getElementById('facet2').value);
		if (facet1 < 0) { facet1 = 0; document.getElementById('facet1').value = facet1; }
		if (facet2 < 0) { facet2 = 0; document.getElementById('facet2').value = facet2; }

		if (id_material >= 42 && id_material <= 60) { document.getElementById('tr_facet2').style.display = "none"; facet2 = 0; } /// Г§ГҐГ°ГЄГ Г«Г® id_material>=42 && id_material<=60
		else document.getElementById('tr_facet2').style.display = "";



		if (facet1 > 55) { document.getElementById('facet1').value = 55; facet1 = 55; }
		if (facet2 > 55) { document.getElementById('facet2').value = 55; facet2 = 55; }


		if (id_form < 6) { var facet = [120, 150, 200, 250, 290, 370, 450, 520, 600] }
		else { var facet = [390, 590, 680, 800, 900, 1000, 1150, 1300, 1500] }

		if (facet1 < 5 && facet1 > 0) st_facet1 = 0;
		else if (facet1 >= 5 && facet1 < 16) st_facet1 = (a + b) * 2 / 1000 * facet[0];
		else if (facet1 >= 16 && facet1 < 21) st_facet1 = (a + b) * 2 / 1000 * facet[1];
		else if (facet1 >= 21 && facet1 < 26) st_facet1 = (a + b) * 2 / 1000 * facet[2];
		else if (facet1 >= 25 && facet1 < 31) st_facet1 = (a + b) * 2 / 1000 * facet[3];
		else if (facet1 >= 30 && facet1 < 36) st_facet1 = (a + b) * 2 / 1000 * facet[4];
		else if (facet1 >= 36 && facet1 < 41) st_facet1 = (a + b) * 2 / 1000 * facet[5];
		else if (facet1 >= 40 && facet1 < 46) st_facet1 = (a + b) * 2 / 1000 * facet[6];
		else if (facet1 >= 45 && facet1 < 51) st_facet1 = (a + b) * 2 / 1000 * facet[7];
		else if (facet1 >= 50 && facet1 < 56) st_facet1 = (a + b) * 2 / 1000 * facet[8];

		if (facet2 < 5 && facet2 > 0) st_facet2 = 0;
		else if (facet2 >= 5 && facet2 < 16) st_facet2 = (a + b) * 2 / 1000 * facet[0];
		else if (facet2 >= 16 && facet2 < 21) st_facet2 = (a + b) * 2 / 1000 * facet[1];
		else if (facet2 >= 21 && facet2 < 26) st_facet2 = (a + b) * 2 / 1000 * facet[2];
		else if (facet2 >= 25 && facet2 < 31) st_facet2 = (a + b) * 2 / 1000 * facet[3];
		else if (facet2 >= 30 && facet2 < 36) st_facet2 = (a + b) * 2 / 1000 * facet[4];
		else if (facet2 >= 36 && facet2 < 41) st_facet2 = (a + b) * 2 / 1000 * facet[5];
		else if (facet2 >= 40 && facet2 < 46) st_facet2 = (a + b) * 2 / 1000 * facet[6];
		else if (facet2 >= 45 && facet2 < 51) st_facet2 = (a + b) * 2 / 1000 * facet[7];
		else if (facet2 >= 50 && facet2 < 56) st_facet2 = (a + b) * 2 / 1000 * facet[8];

	}
	else {
		document.getElementById('tr_facet1').style.display = "none";
		document.getElementById('tr_facet2').style.display = "none";
		document.getElementById('tr_facet3').style.display = "none";

		document.getElementById('facet1').value = "0"; document.getElementById('facet2').value = "0";
	}

	st_facet = n * Math.round(st_facet1 + st_facet2);

	if (n > 1) document.getElementById('st_facet0').innerHTML = n + " Гµ " + st_facet / n + " Г°ГіГЎ.=";
	else document.getElementById('st_facet0').innerHTML = "";

	if (id_form > 6) {
		document.getElementById('label4').style.display = "none";
		document.getElementById('label5').style.display = "none";
		if (id_kromka > 2) setCheckedValue(document.forms['calc'].elements['kromka10'], "0");

		if (st_facet > 0) { document.getElementById('label2').style.display = "none"; if (id_kromka > 1) { setCheckedValue(document.forms['calc'].elements['kromka10'], "0"); kromka = 0; } }
		else document.getElementById('label2').style.display = "";
	}

	else {


		if (st_facet > 0) {
			document.getElementById('label4').style.display = "none"; document.getElementById('label5').style.display = "none";
			document.getElementById('label3').style.display = "none";
			if (id_kromka > 1) { setCheckedValue(document.forms['calc'].elements['kromka10'], "0"); kromka = 0; }
		}

		else { document.getElementById('label3').style.display = ""; document.getElementById('label4').style.display = ""; document.getElementById('label5').style.display = ""; }

	}

	/*-------------------------  7   -------------------------*/


	var st_otv = 0;
	var st_tmp = 0;
	var d_otv, n_otv, zenkovka_otv;

	if (id_material == 30 || id_material == 31) { document.getElementById('view_otver').checked = false; document.getElementById('view_otver').disabled = true; document.getElementById('tr_otver0').style.color = color[0]; }
	else { document.getElementById('view_otver').disabled = false; document.getElementById('tr_otver0').style.color = color[1]; }


	if (document.getElementById('view_otver').checked) {
		document.getElementById('tr_otver1').style.display = ""; document.getElementById('tr_otver2').style.display = "";

		var otver_diam = document.getElementsByName("otver_diam[]");
		var otver_count = document.getElementsByName("otver_count[]");


		for (var i = 0; i < otver_diam.length; i++) {
			st_tmp = 0;
			d_otv = parseFloat(otver_diam[i].value);
			if (d_otv < 0) { d_otv = 0; document.getElementById('diam_' + i).value = d_otv; }
			if (d_otv > 140) { d_otv = 140; document.getElementById('diam_' + i).value = 140; }
			n_otv = parseFloat(otver_count[i].value);
			if (n_otv < 0) { n_otv = 0; document.getElementById('count_' + i).value = n_otv; }
			n_otv *= k_triplex;

			if (id_material == 0) {
				document.getElementById('zenkovka_' + i).disabled = true;
				document.getElementById('zenkovka_' + i).checked = false;
				document.getElementById('label_zenkovka_' + i).style.color = color[0];
			}
			else {
				document.getElementById('zenkovka_' + i).disabled = false;
				document.getElementById('label_zenkovka_' + i).style.color = color[1];
			}
			if (document.getElementById('zenkovka_' + i).checked) zenkovka_otv = 150;
			else zenkovka_otv = 0;



			if (mm < 8) {
				if (d_otv < 3) st_tmp = 0;
				else if (d_otv < 13) st_tmp = 40 * n_otv + zenkovka_otv;
				else if (d_otv < 31) st_tmp = 50 * n_otv + zenkovka_otv;
				else if (d_otv < 89) st_tmp = 80 * n_otv + zenkovka_otv;
				else if (d_otv < 141) st_tmp = 100 * n_otv + zenkovka_otv;
				else st_tmp = 0;
			}
			else if (mm < 15) {
				if (d_otv < 3) st_tmp = 0;
				else if (d_otv < 13) st_tmp = 50 * n_otv + zenkovka_otv;
				else if (d_otv < 31) st_tmp = 70 * n_otv + zenkovka_otv;
				else if (d_otv < 89) st_tmp = 100 * n_otv + zenkovka_otv;
				else if (d_otv < 141) st_tmp = 130 * n_otv + zenkovka_otv;
				else st_tmp = 0;
			}
			else if (mm < 20) {
				if (d_otv < 3) st_tmp = 0;
				else if (d_otv < 13) st_tmp = 80 * n_otv + zenkovka_otv;
				else if (d_otv < 31) st_tmp = 100 * n_otv + zenkovka_otv;
				else if (d_otv < 89) st_tmp = 140 * n_otv + zenkovka_otv;
				else if (d_otv < 141) st_tmp = 200 * n_otv + zenkovka_otv;
				else st_tmp = 0;
			}

			document.getElementById('st_otver_' + i).innerHTML = st_tmp;
			document.getElementById('otver_st_' + i).value = st_tmp;
			st_otv += st_tmp;
		}
		st_otv *= n;
		if (n > 1) document.getElementById('st_otv0').innerHTML = n + " Гµ " + st_otv / n + " Г°ГіГЎ.=";
		else document.getElementById('st_otv0').innerHTML = "";
	}
	else {
		document.getElementById('tr_otver1').style.display = "none";
		document.getElementById('tr_otver2').style.display = "none";

		st_otv = 0;
	}
	/*------------------------  8  --------------------------*/
	var st_vyrez = 0;

	if (id_material == 30 || id_material == 31) { document.getElementById('view_vyrez').checked = false; document.getElementById('view_vyrez').disabled = true; document.getElementById('tr_vyrez0').style.color = color[0]; }
	else { document.getElementById('view_vyrez').disabled = false; document.getElementById('tr_vyrez0').style.color = color[1]; }


	if (document.getElementById('view_vyrez').checked) {
		document.getElementById('tr_vyrez1').style.display = ""; document.getElementById('tr_vyrez2').style.display = ""; document.getElementById('tr_vyrez3').style.display = "";
		var n_vnesh = parseFloat(document.getElementById('n_vnesh').value);
		if (n_vnesh < 0) { n_vnesh = 0; document.getElementById('n_vnesh').value = n_vnesh; }

		var n_vnutr = parseFloat(document.getElementById('n_vnutr').value);
		if (n_vnutr < 0) { n_vnutr = 0; document.getElementById('n_vnutr').value = n_vnutr; }

		st_vyrez = n * k_triplex * (n_vnesh * 470 + n_vnutr * 970);

		if (n > 1) document.getElementById('st_vyrez0').innerHTML = n + " Гµ " + st_vyrez / n + " Г°ГіГЎ.=";
		else document.getElementById('st_vyrez0').innerHTML = "";
	}
	else {
		document.getElementById('tr_vyrez1').style.display = "none";
		document.getElementById('tr_vyrez2').style.display = "none";
		document.getElementById('tr_vyrez3').style.display = "none";
	}

	/*---------------------------9-----------------------*/
	var st_zakalka = 0;



	if ((id_material >= 30 && id_material <= 60) || mm < 3) { document.getElementById('view_zakalka').checked = false; document.getElementById('view_zakalka').disabled = true; document.getElementById('tr_zakalka0').style.color = color[0]; }
	else { document.getElementById('view_zakalka').disabled = false; document.getElementById('tr_zakalka0').style.color = color[1]; }

	if (document.getElementById('view_zakalka').checked) {
		document.getElementById('tr_zakalka1').style.display = ""; st_zakalka = zakalka[id_material] * ss;
		if (n > 1) document.getElementById('st_zakalka0').innerHTML = n + " Гµ " + st_zakalka / n + " Г°ГіГЎ.=";
		else document.getElementById('st_zakalka0').innerHTML = "";
	}
	else { document.getElementById('tr_zakalka1').style.display = "none"; st_zakalka = 0; }
	/*-----------------------10---------------------------*/
	var st_pesok = 0;

	if (id_material == 30 || id_material == 31) { document.getElementById('view_pesok').checked = false; document.getElementById('view_pesok').disabled = true; document.getElementById('tr_pesok0').style.color = color[0]; }
	else { document.getElementById('view_pesok').disabled = false; document.getElementById('tr_pesok0').style.color = color[1]; }

	if (document.getElementById('view_pesok').checked) {
		document.getElementById('tr_pesok1').style.display = "";
		document.getElementById('tr_pesok2').style.display = "";
		var id_pesok = getCheckedValue(document.forms['calc'].elements['pesok10']);
		if (id_pesok == 1) st_pesok = 1500 * ss;
		else if (id_pesok == 2) st_pesok = 2700 * ss + 1000;
		else if (id_pesok == 3) st_pesok = 5000 * ss + 1000;

		st_pesok = Math.round(st_pesok / n) * n;

		if (n > 1) document.getElementById('st_pesok0').innerHTML = n + " Гµ " + st_pesok / n + " Г°ГіГЎ.=";
		else document.getElementById('st_pesok0').innerHTML = "";

	}
	else {
		document.getElementById('tr_pesok1').style.display = "none";
		document.getElementById('tr_pesok2').style.display = "none";
		setCheckedValue(document.forms['calc'].elements['pesok10'], "0");
	}
	/*------------------------11--------------------------*/
	var st_gravir = 0;

	if (id_material == 0 || (id_material >= 32 && id_material <= 41) || id_material == 30 || id_material == 31) { document.getElementById('view_gravir').checked = false; document.getElementById('view_gravir').disabled = true; document.getElementById('tr_gravir0').style.color = color[0]; }
	else { document.getElementById('view_gravir').disabled = false; document.getElementById('tr_gravir0').style.color = color[1]; }

	if (document.getElementById('view_gravir').checked) {
		document.getElementById('tr_gravir1').style.display = "";
		document.getElementById('tr_gravir2').style.display = "";
		st_gravir = parseFloat(document.getElementById('n_gravir').value);

		if (st_gravir < 0) { st_gravir = 0; document.getElementById('n_gravir').value = st_gravir; }

		st_gravir *= n * 1000;
		if (n > 1) document.getElementById('st_gravir0').innerHTML = n + " Гµ " + st_gravir / n + " Г°ГіГЎ.=";
		else document.getElementById('st_gravir0').innerHTML = "";
	}
	else {
		document.getElementById('tr_gravir1').style.display = "none";
		document.getElementById('tr_gravir2').style.display = "none";
	}
	/*--------------------------12------------------------*/
	var st_plenka = 0;
	var cena_plenka = 1200;

	if ((id_material >= 34 && id_material <= 41) || id_material == 30 || id_material == 31) { document.getElementById('view_plenka').checked = false; document.getElementById('view_plenka').disabled = true; document.getElementById('tr_plenka0').style.color = color[0]; }
	else { document.getElementById('view_plenka').disabled = false; document.getElementById('tr_plenka0').style.color = color[1]; }

	if (document.getElementById('view_plenka').checked) {
		document.getElementById('tr_plenka1').style.display = "";
		document.getElementById('tr_plenka2').style.display = "";
		var id_plenka = getCheckedValue(document.forms['calc'].elements['plenka10']);
		if (id_material >= 42 && id_material <= 60) cena_plenka = 350;


		if (id_plenka == 1) st_plenka = cena_plenka * ss;
		else if (id_plenka == 2) st_plenka = 1200 * ss;
		st_plenka = Math.round(st_plenka / n) * n;

		if (n > 1) document.getElementById('st_plenka0').innerHTML = n + " Гµ " + st_plenka / n + " Г°ГіГЎ.=";
		else document.getElementById('st_plenka0').innerHTML = "";
	}
	else {
		document.getElementById('tr_plenka1').style.display = "none";
		document.getElementById('tr_plenka2').style.display = "none";
	}
	/*------------------------13--------------------------*/
	var st_zamer = 0;
	if (document.getElementById('view_zamer').checked) {
		document.getElementById('tr_zamer1').style.display = "";
		document.getElementById('tr_zamer2').style.display = "";
		var id_zamer = getCheckedValue(document.forms['calc'].elements['zamer10']);
		if (id_zamer == 1) { st_zamer = 1000; document.getElementById('tr_km_zamer').style.display = "none"; }
		else if (id_zamer == 2) {
			var n_km_zamer = parseFloat(document.getElementById('n_km_zamer').value);
			if (n_km_zamer < 0) { n_km_zamer = 0; document.getElementById('n_km_zamer').value = n_km_zamer; }
			st_zamer = 1000 + 2 * 30 * n_km_zamer;
			document.getElementById('tr_km_zamer').style.display = "";

		}

	}
	else {
		document.getElementById('tr_zamer1').style.display = "none";
		document.getElementById('tr_zamer2').style.display = "none";
	}
	/*------------------------14--------------------------*/
	var st_dostavka = 0;
	if (document.getElementById('view_dostavka').checked) {
		document.getElementById('tr_dostavka1').style.display = "";
		document.getElementById('tr_dostavka2').style.display = "";
		var id_dostavka = getCheckedValue(document.forms['calc'].elements['dostavka10']);
		if (id_dostavka == 1) { st_dostavka = 2500; document.getElementById('nur-sultan').style.display = ""; }
		else if (id_dostavka == 2) {
			document.getElementById('nur-sultan').style.display = "none";
		}

	}
	else {
		document.getElementById('tr_dostavka1').style.display = "none";
		document.getElementById('tr_dostavka2').style.display = "none";
	}

	/*--------------------------------------------------*/
	document.getElementById('st_dostavka').innerHTML = st_dostavka;
	document.getElementById('st_zamer').innerHTML = st_zamer;

	let laminatingValue = document.getElementById('st_plenka').innerHTML = st_plenka;
	let engravingValue = document.getElementById('st_gravir').innerHTML = st_gravir;
	let sandBlastingValue = document.getElementById('st_pesok').innerHTML = st_pesok;
	let zakalkaValue = document.getElementById('st_zakalka').innerHTML = st_zakalka;
	let cutoutValue = document.getElementById('st_vyrez').innerHTML = st_vyrez;
	let facetValue = document.getElementById('st_facet').innerHTML = st_facet;
	let holeValue = document.getElementById('st_otv').innerHTML = st_otv;
	let kromkaValue = document.getElementById('st_kromka').innerHTML = kromka;
	let rezkaValue = document.getElementById('st_rezka').innerHTML = rezka;
	let paymentMethod = document.getElementById('payment_method').value;
	let firstSide = document.getElementById("facet1").value
	let secondSide = document.getElementById("facet2").value
	let holeCount = document.getElementById("diam_0").value
	let holeDiameter = document.getElementById("count_0").value
	let insideCutout = document.getElementById("n_vnesh").value
	let outsideCutout = document.getElementById("n_vnutr").value
	let engravingMeter = document.getElementById("n_gravir").value
	let comment = document.getElementById("comment_for_order").value
	let date = new Date().toLocaleDateString() + " время " + new Date().toLocaleTimeString()
	let id = Math.round(Math.random() * 1000000);
	let lenDiv;
	document.getElementById("view_otver").addEventListener("click", function () {
		lenDiv = 1;
	})
	let totalPrice = document.getElementById('st_itogo').innerHTML = st_dostavka + st_zamer + rezka + st_plenka + st_gravir + st_pesok + st_zakalka + st_vyrez + st_facet + kromka + st_otv;
	document.querySelector(".mainButton").addEventListener("click", function () {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				let childs
				for (let i = 0; i < document.getElementById("type").length; i++) {
					if (document.getElementById("type").options[i].selected) {
						childs = document.getElementById("type").options[i].innerHTML;
					}
				}
				let typeKromka
				for (let i = 0; i < document.getElementById("tr_kromka1").getElementsByTagName("label").length; i++) {
					if (document.getElementById("tr_kromka1").getElementsByTagName("input")[i].checked) {
						typeKromka = document.getElementById("tr_kromka1").getElementsByTagName("label")[i].textContent;
					}
				}
				let sandBlastingType
				for (let i = 0; i < document.getElementById("tr_pesok1").getElementsByTagName("label").length; i++) {
					if (document.getElementById("tr_pesok1").getElementsByTagName("input")[i].checked) {
						sandBlastingType = document.getElementById("tr_pesok1").getElementsByTagName("label")[i].textContent;
					} else {
						sandBlastingType = "Нет";
					}
				}
				let laminatingType
				for (let i = 0; i < document.getElementById("tr_plenka1").getElementsByTagName("label").length; i++) {
					if (document.getElementById("tr_plenka1").getElementsByTagName("input")[i].checked) {
						laminatingType = document.getElementById("tr_plenka1").getElementsByTagName("label")[i].textContent;
					} else {
						laminatingType = "Нет";
					};
				}
				let deliveryType
				if (id_dostavka == 1) {
					deliveryType = "Нур-Султан";
					delivery = "Доставка курьером"
				} else {
					deliveryType = "Самовывоз";
					delivery = "Самовывоз"
				}


				// ДОДЕЛАТЬ (записывается больше 1 заказов)
				db.collection('orders').doc(user.email).collection("user_order").add({
					id: id,
					category: childs,
					width: a,
					height: b,
					zakalka: zakalkaValue,
					rezka: rezkaValue,
					quantity: n,
					edgeTreatment: kromkaValue,
					edgeTreatmentType: typeKromka,
					facet: facetValue,
					firstSide: firstSide,
					secondSide: secondSide,
					hole: holeValue,
					holeCount: holeCount,
					holeDiametr: holeDiameter,
					cutout: cutoutValue,
					insideCutout: insideCutout,
					outsideCutout: outsideCutout,
					sandBlasting: sandBlastingValue,
					sandBlastingType: sandBlastingType,
					engraving: engravingValue,
					engravingMeter: engravingMeter,
					laminating: laminatingValue,
					laminatingType: laminatingType,
					oplata: paymentMethod,
					totalPrice: totalPrice,
					delivery: delivery,
					deliveryType: deliveryType,
					comment: comment,
					date: date,
					email: user.email,
				}).then((output) => {
					let finalOrder = {
						"id": id, "category": childs, "width": a, "height": b, "zakalka": zakalkaValue, "rezka": rezkaValue, "quantity": n, "edgeTreatment": kromkaValue, "edgeTreatmentType": typeKromka, "facet": facetValue, "firstSide": firstSide, "secondSide": secondSide, "hole": holeValue, "holeCount": holeCount, "holeDiametr": holeDiameter, "cutout": cutoutValue, "insideCutout": insideCutout, "outsideCutout": outsideCutout, "sandBlasting": sandBlastingValue, "sandBlastingType": sandBlastingType, "engraving": engravingValue, "engravingMeter": engravingMeter, "laminating": laminatingValue, "laminatingType": laminatingType, "oplata": paymentMethod, "totalPrice": totalPrice, "delivery": delivery, "deliveryType": deliveryType, "comment": comment, "date": date, "email": user.email,
					}
				});
			} else {
				// User is signed ou
			};
		});
	});
};

function makePdfOrder() {
	firebase.auth().onAuthStateChanged((user) => {
		db.collection("orders").doc(user.email).collection("user_order").get().then(snapshot => {
			let data = snapshot.docs.map(doc => doc.data());
			var dd = {
				content: [
					"Категория: " + data.category,
					"Ширина: " + data.width + " мм",
					"Высота: " + data.height + " мм",
					"Количество: " + data.quantity + " шт",
					"Закалка: " + data.zakalka + " тг",
					"Стоимость материала с резкой: " + data.rezka + " тг",
					"Тип обработки кромки" + data.edgeTreatmentType + " тг",
					"Обработка кромки: " + data.edgeTreatment + " тг",
					"Фацет: " + data.facet + " тг",
					"Ширина фацета 1-я сторона (5-55мм): " + data.firstSide + " мм",
					"Ширина фацета 2-я сторона (5-55мм): " + data.secondSide + " мм",
					"Отверстие: " + data.hole + " тг",
					"Количество отверстий: " + data.holeCount + " шт",
					"Диаметр отверстий: " + data.holeDiametr + " мм",
					"Всего отверствий: " + data.lenDiv,
					"Вырез: " + data.cutout + " тг",
					"Внутреный вырез: " + data.insideCutout + " шт",
					"Внешний вырез: " + data.outsideCutout + " шт",
					"Пескоструйный рисунок: " + data.sandBlasting + " тг",
					"Типа пескоструйного рисунка:" + data.sandBlastingType,
					"Гравировка: " + data.engraving + " тг",
					"Длина гравировки: " + data.engravingMeter + " м",
					"Покрытие пленкой: " + data.laminating + " тг",
					"Тип покрытия пленки: " + data.laminatingType,
					"Итого: " + data.totalPrice + " тг",
					"Оплата: " + data.oplata,
					"Доставка: " + data.delivery,
					"Куда: " + data.deliveryType,
					"Комментарий: " + data.comment,
					"Дата заказа: " + data.date,
					"Заказал: " + data.email
				]

			}
			// pdfMake.createPdf(dd).download('заказ.pdf');
		})
	})
}