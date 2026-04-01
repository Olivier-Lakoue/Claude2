//======================================================================================================
// D3Class_YearMonthCalendars
// Classe calendrier heatmap mensuel/annuel — D3.v3
// Basée sur _D3v3_render1MonthCal_1b
// Modes : "line" | "block" | "column" | "year"
//======================================================================================================



	//function _pad(t){let e=Math.floor(Math.abs(t));return(e<10?"0":"")+e}getVarType=function(){var t={undefined:"Undefined",boolean:"Boolean",number:"Number",string:"String",function:"Function",Undefined:"Undefined",Null:"Null",Boolean:"Boolean",Number:"Number",String:"String",Function:"Function",Array:"Array",StyleSheetList:"Array"};return function(e){var n,l;return null===e?"Null":void 0===e?"Undefined":(l=t[n=typeof e])?l:(n={}.toString.call(e).slice(8,-1),t[n]||(e instanceof Array?"Array":e.propertyIsEnumerable(0)&&void 0!==e.length?"Array":"Object"))}}(),Number.prototype.commarize2=commarize2,String.prototype.commarize2=commarize2;




//=================================================================
//d3.v3

		/*
			//_D3_checkVersion({_check_version:3})
			//{status:(_curr_version==_check_version), _d3_installed, _curr_version, _check_version}

				const d3_check = _D3_checkVersion({_check_version:3}) ;
							
					if (!d3_check.status) {
						
						_Html_render1MonthCal_1b(params) ;
						
						return ;
						
					
					} ;
					
		*/
				


		//_D3_checkVersion({_check_version:3})
		//{status:(_curr_version==_check_version), _d3_installed, _curr_version, _check_version}
	function _D3_checkVersion(params) 
	{

		console.log("_D3_checkVersion") ;console.log(params) ;

		//-check d3.v3
			var _d3_installed = false, _check_version = 3, _curr_version = -1 ;

				if ("_check_version" in params) _check_version = params._check_version ; 

			//----------------------------------
			//-check d3.v3
				
					if (typeof(d3) == 'undefined') { 
						/* load d3 here */ 
						console.warn('d3 not installed')
						_d3_installed = false ;
					} else {
						
						_d3_installed = true ;
						fld_n = d3.version, fld_l = fld_n.split('.');	
						_curr_version = parseInt(fld_l[0])
						
						//--check version .v3
							if (_curr_version==_check_version) {
								//this.d3_installed = [true, fld_i] ;
								
								//console.log('d3 installed version > '+_curr_version);	//d3 installed > 3.5.17

							} else {
								//this.d3_installed = false ;
								//this.render_engine = "html"
							
								console.warn('d3 installed bad version > '+_curr_version);	//d3 installed > 3.5.17
							}
						
					}

					//if (!d3_v3) {
					//	_Html_render1MonthCal_1b(params) ;
					//	return ;
					//} ;*
					
					
			return {status:(_curr_version==_check_version), _d3_installed, _curr_version, _check_version} ;

	} ;



//======================================================================================================
// Exemple d'utilisation
//======================================================================================================

/*

// --- workflow 1 — tout d'un coup
var cal = new D3Class_YearMonthCalendars({
    div_tgt      : "div_content1",
    data         : myData,
    color_mode   : "delta",
    value_format : "raw"
}) ;
cal.render({ mode:"block", year:2025, month:3 }) ;


// --- workflow 2 — init tôt, data tard
var cal = new D3Class_YearMonthCalendars({ div_tgt:"div_content1" }) ;
// ... plus tard ...
cal.setData({ data:myData }) ;
cal.render({ mode:"line", year:2026, month:1 }) ;


// --- workflow 3 — mode year — bornes calculées automatiquement
var cal = new D3Class_YearMonthCalendars({
    div_tgt    : "div_content1",
    data       : myData,
    color_mode : "delta"
}) ;
cal.render({ mode:"year", month_mode:"block" }) ;


// --- workflow 4 — changement de données sans recréer l'instance
cal.setData({ data:newData }) ;
cal.render({ mode:"block", year:2026, month:3 }) ;


// --- workflow 5 — chainage
new D3Class_YearMonthCalendars({ div_tgt:"div_content1" })
    .setData({ data:myData })
    .render({ mode:"year" }) ;

*/






//======================================================================================================
// D3Class_YearMonthCalendars
// Classe calendrier heatmap mensuel/annuel — D3.v3
// Basée sur _D3v3_render1MonthCal_1b
// Modes : "line" | "block" | "column" | "year"
//======================================================================================================


//======================================================================================================
// v1
//======================================================================================================

//======================================================================================================
// D3Class_YearMonthCalendars
// Classe calendrier heatmap mensuel/annuel — D3.v3
// Basée sur _D3v3_render1MonthCal_1b
// Modes : "line" | "block" | "column" | "year" | "yearly"
//======================================================================================================
//======================================================================================================
// D3Class_YearMonthCalendars
// Classe calendrier heatmap mensuel/annuel — D3.v3
// Basée sur _D3v3_render1MonthCal_1b
// Modes : "line" | "block" | "column" | "year" | "yearly"
//
// Pattern events — invariant tous modes :
//   1) console.log par défaut — toujours
//   2) ouvre div_foot si existe + appel bar chart natif (commenté — intégration future)
//   3) callback externe si fourni — onMonthClick / onDayClick
//======================================================================================================

	class D3Class_YearMonthCalendars1 {

		//=========================================
		// constructor
		//=========================================
		constructor(params) {

			params = params || {} ;
			
			console.log("D3Class_YearMonthCalendars > constructor", params) ;
	
						const d3_check = _D3_checkVersion({_check_version:3}) ;
							if (!d3_check.status) { 
									//_Html_render1MonthCal_1b(params) ; return ; 
								console.log("D3Class_YearMonthCalendars > constructor > ", "d)3.v3 not installed") ;
								return ;
							}
						
					this.d3_check = false ;
					this.month_names = ["January","February","March","April","May","June", "July","August","September","October","November","December"] ;



					this.div_tgt      = params.div_tgt      || "div_content1" ;
					this.color_mode   = params.color_mode   || "delta", this.value_format = params.value_format || "raw" ;
					this.colors       = params.colors       || ["#e53935","#ffeb3b","#ffeb3b","#4caf50"] ;
					this.threshold    = params.threshold    ?? 0 ;
					this.show_day     = params.show_day     !== false ;
					this.line2_mode   = params.line2_mode   || "arrow" ;
					this.border_color = params.border_color || null ;

					this.color_binaire  = params.color_binaire  || { seuil:0, clr_under:"#e53935", clr_above:"#4caf50" } ;
					this.color_tricolor = params.color_tricolor || {
						seuil_low:-0.005, seuil_high:0.005,
						clr_under:"#e53935", clr_neutral:"white", clr_above:"lightgreen"
					} ;

					//--- callbacks — pattern invariant tous modes
					this.onMonthClick = params.onMonthClick || null ;  // ({ div_foot, year, month, data })
					this.onDayClick   = params.onDayClick   || null ;  // ({ div_foot, year, month, day, value })

					this.data = {}, this.cal_dic = {}, this.objCsv = {} ; ;


						if (params.data    ) this.data    = params.data ;
						if (params.cal_dic ) this.cal_dic = params.cal_dic ;

						window._odl_cal_registry = window._odl_cal_registry || {} ;

					console.log("D3Class_YearMonthCalendars > constructor", this.div_tgt) ;
				
				
		}


				//=========================================
				// setData — chainable
				//=========================================
				setData(params) {

					params = params || {} ;

					if (params.data    ) this.data    = params.data ;
					if (params.cal_dic ) this.cal_dic = params.cal_dic ;

						if ("data" in this.cal_dic) {
							this.data = this.cal_dic.data ;
							if (this.cal_dic.cal_colors) this.colors = this.cal_dic.cal_colors ;
						}

						

					console.log("D3Class_YearMonthCalendars > setData > keys:", Object.keys(this.data).length) ;

					return this ;
				}


				//=========================================
				// computeMonth
				//=========================================
				computeMonth(year, month) {

						console.log("computeMonth", [year, month]) ;

					const p_year    = "" + year, p_month   = _pad(month) ;
					const YearMonth = p_year + "-" + p_month ;

					var data_month = {}, month_lst = [] ;
					
							Object.keys(this.data).filter(k => k.startsWith(YearMonth))
								.forEach(k => { data_month[k] = this.data[k] ; }) ;

					const vals = Object.values(data_month) ;
					const avg_month    = vals.length ? vals.reduce((a,b) => a+b, 0) / vals.length : 0 ;
					const border_color = this.border_color || (avg_month >= this.threshold ? "#4caf50" : "#e53935") ;

					return { data_month, avg_month, border_color, YearMonth } ;
				}


				//=========================================
				// getClr
				//=========================================
				getClr(d, ctx) {

					const { fmt, data_month } = ctx ;
					const date_str = fmt(d) ;
					if (!(date_str in data_month)) return "#e0e0e0" ;

					const val = data_month[date_str] ;

					if (this.color_mode === "quartile") return ctx.color(val) ;

					if (this.color_mode === "binaire") {
						return val >= this.color_binaire.seuil ? this.color_binaire.clr_above : this.color_binaire.clr_under ;
					}

					if (this.color_mode === "tricolor") {
						if (val < this.color_tricolor.seuil_low)  return this.color_tricolor.clr_under ;
						if (val > this.color_tricolor.seuil_high) return this.color_tricolor.clr_above ;
						return this.color_tricolor.clr_neutral ;
					}

					if (this.color_mode === "delta") {
						const prev = this.getPrev(date_str, ctx) ;
						if (prev === null) return "#e0e0e0" ;
						return val > prev ? this.color_binaire.clr_above : this.color_binaire.clr_under ;
					}

					return ctx.color(val) ;
				}


				//=========================================
				// getPrev
				//=========================================
				getPrev(date_str, ctx) {

					const { fmt, data_month } = ctx ;
					var d = new Date(date_str) ;

					for (var i = 1; i <= 7; i++) {
						d.setDate(d.getDate() - 1) ;
						const prev_str = fmt(d) ;
						if (prev_str in data_month) return data_month[prev_str] ;
					}
					return null ;
				}


				//=========================================
				// fmtVal
				//=========================================
				fmtVal(v) {
					if (this.value_format === "pct") return (v * 100).toFixed(2) + " %" ;
					if (this.value_format === "int") return Math.round(v) ;
					return v.toFixed(2) ;
				}


				//=========================================
				// cellSize
				//=========================================
				cellSize(mode) {

					const cont_w        = document.getElementById(this.div_tgt).clientWidth ;
					const nb_cols       = cont_w >= 600 ? 3 : 2 ;
					const cal_w         = Math.floor(cont_w / nb_cols) - 10 ;
					const cellSize      = Math.floor(cal_w / 8) ;
					const cellSize_line = Math.floor((cont_w - 40) / 31) ;
					const cs            = (mode === "block") ? cellSize : cellSize_line ;
					const shift_up      = (mode === "block") ? 16 : 0 ;

					const nb_cols_col = cont_w >= 600 ? 6 : 3 ;
					const col_w       = Math.floor(cont_w / nb_cols_col) - 4 ;
					const cs_col_h    = 20 ;

					const cs_w = mode === "column" ? col_w    - 1 : cs - 1 ;
					const cs_h = mode === "column" ? cs_col_h - 1 : cs - 1 ;

					var width  = mode === "block"  ? cs * 7 + 10  : cont_w - 10 ;
					var height = mode === "block"  ? cs * 6 + 1   : cs + 1 ;

					if (mode === "column") { width = col_w ; height = 31 * cs_col_h + 16 ; }

					return { cs, cs_w, cs_h, width, height, col_w, cs_col_h, nb_cols, shift_up, cellSize_line, cont_w } ;
				}


				//=========================================
				// _footWidth
				//=========================================
				_footWidth(mode, width) {
					if (mode === "block") return width + "px" ;
					return "99%" ;
				}


				//=========================================
				// createSvg
				//=========================================
				createSvg(params) {

					const { mode, width, height, border_color, div_create } = params ;

					const cont   = document.getElementById(this.div_tgt) ;
					const div_id = "div_cal_" + Makeid(6) ;

					const d_style = "display:inline-block;vertical-align:top;margin:0.25rem;text-align:center;line-height:0;" ;
					cont.insertAdjacentHTML("beforeend", `<div id="${div_id}" style="${d_style}"></div>`) ;

					var svg_sel = d3.select("#" + div_id).append("svg")
						.attr("width",  width)
						.attr("height", height) ;

					if (mode === "block" ) svg_sel.style("border-left", "4px solid " + border_color) ;
					if (mode === "column") svg_sel.style("border-top",  "4px solid " + border_color) ;
					if (mode === "line"  ) svg_sel.style("border-left", "4px solid " + border_color) ;

					var svg = svg_sel.append("g") ;

					var div_foot = "" ;
					if (div_create && mode !== "column") {
						div_foot      = "div_cal_" + Makeid(6) ;
						const foot_w  = this._footWidth(mode, width) ;
						const f_style = `width:${foot_w};text-align:left;display:none;font-size:11px;vertical-align:top;margin:0.25rem;` ;
						cont.insertAdjacentHTML("beforeend", `<div id="${div_foot}" style="${f_style}"></div>`) ;
					}

					return { svg, svg_sel, div_id, div_foot } ;
				}


				//=========================================
				// animateRects — avec delay (modes mensuels)
				//=========================================
				animateRects(rect) {
					rect.attr("opacity", 0)
						.transition()
						.duration(500)
						.delay((d, i) => i * 100)
						.attr("opacity", 1) ;
				}


				//=========================================
				// attachEvents
				// Pattern invariant tous modes :
				//   1) console.log par défaut
				//   2) ouvre div_foot + appel bar chart natif (commenté)
				//   3) callback externe si fourni
				//=========================================
				attachEvents(rect, ctx) {

					const { fmt, data_month, div_foot, year, month } = ctx ;
					const self = this ;

					//--- mouseover / mouseout
					rect
						.on("mouseover", function() {
							d3.select(this).attr("stroke","black").attr("stroke-width","2px") ;
						})
						.on("mouseout", function() {
							d3.select(this).attr("stroke",null).attr("stroke-width",null) ;
						}) ;

					//--- click jour — pattern invariant
					rect.on("click", function(d) {

						const date_str = fmt(d) ;
						const val      = date_str in data_month ? data_month[date_str] : null ;

						//--- 1) console.log par défaut — toujours
						console.log("DayClick >", { date:date_str, value:val, pct:val ? self.fmtVal(val) : "N/A" }) ;

						//--- 2) callback onDayClick si fourni
						if (typeof self.onDayClick === "function") {
							self.onDayClick({ div_foot, year, month, day:date_str, value:val }) ;
						}
					}) ;
				}


				//=========================================
				// _fireMonthClick — pattern invariant click mois
				// appelé par render_month + render_yearly
				//=========================================
				_fireMonthClick(params) {

					const { div_foot, year, month, data_month } = params ;

					//--- 1) console.log par défaut — toujours
					console.log("MonthClick >", { year, month, div_foot, keys:Object.keys(data_month).length }) ;

					//--- 2) ouvre div_foot si existe
					if (div_foot !== "") {

						$("#"+div_foot).css({'display':'block', 'width':'99%'}).html("") ;

						//--- appel bar chart natif — à activer quand intégration native
						// const data_lst = Object.keys(data_month).map(i_date => [i_date, data_month[i_date]]) ;
						// _d3v3_vBartSortable_1({
						//     div_tgt    : div_foot,
						//     data_lst   : data_lst,
						//     height     : 150,
						//     fld_pos    : [0, 1],
						//     axysY_name : year + ' ' + month
						// }) ;
					}

					//--- 3) callback externe si fourni — lui passe la main
					if (typeof this.onMonthClick === "function") {
						this.onMonthClick({ div_foot, year, month, data:data_month }) ;
					}
				}


				//=========================================
				// render_month — render 1 mois
				//=========================================
				render_month(params) {

					params = params || {} ;

					const mode       = params.mode  || "line", year = parseInt(params.year  || -1) ;
					const month      = parseInt(params.month || -1) ;
					const show_day   = params.show_day   !== undefined ? params.show_day   : this.show_day ;
					const line2_mode = params.line2_mode || this.line2_mode ;
					const div_create = params.div_create || false ;

					if (isNaN(year) || isNaN(month)) {
						console.warn("render_month > year/month invalide", year, month) ; return ;
					}

					var div_month = this.div_tgt ;
						if ("div_tgt" in params) {
							//div_month = params.div_tgt ;
							this.div_tgt = params.div_tgt ;
						} ;
						
							div_month = this.div_tgt ;
						
					//const cont = document.getElementById(this.div_tgt) ;
						const cont = document.getElementById(div_month) ;
							if (!cont) { console.warn("render_month > div_tgt introuvable", div_month) ; return ; }


						const { data_month, border_color, YearMonth } = this.computeMonth(year, month) ;
						
						if (Object.keys(data_month).length === 0) {
							console.warn("render_month > no data", YearMonth) ; return ;
						}

					const dim = this.cellSize(mode) ;
					const { cs, cs_w, cs_h, width, height, col_w, cs_col_h, shift_up } = dim ;

					const { svg, div_id, div_foot } = this.createSvg({ mode, width, height, border_color, div_create }) ;

					const fmt   = d3.time.format("%Y-%m-%d"), _day  = d3.time.format("%w"), _week = d3.time.format("%U") ;

					const v_lst = Object.values(data_month) ;
					const v_abs = Math.max(Math.abs(Math.min(...v_lst)), Math.abs(Math.max(...v_lst))) ;
					const color = d3.scale.linear().domain([-v_abs, 0, 0, v_abs]).range(this.colors) ;

					const ctx = { fmt, data_month, color, div_foot, year, month, _week, _day, dim } ;

					//const month_names0 = ["January","February","March","April","May","June",
					//					   "July","August","September","October","November","December"] ;
									
						const month_names0 = this.month_names ;
										   
										   
					const month_label  = month_names0[month-1].substring(0,3) + " " + year ;
					const self  = this ;

					//--- label mois + click mois
					if (mode === "line") {

						const txt = svg.append("text")
							.attr("x", 2).attr("y", cs * 0.72)
							.attr("text-anchor", "start")
							.style("font-size", "8px").style("font-weight", "bold")
							.style("cursor", typeof this.onMonthClick === "function" ? "pointer" : "default")
							.text(month_label) ;

						if (typeof this.onMonthClick === "function" || div_foot !== "") {
							txt.on("click", () => {
								this._fireMonthClick({ div_foot, year, month, data_month }) ;
							}) ;
						}

					} else if (mode === "column") {

						const txt_col = svg.append("text")
							.attr("x", col_w / 2).attr("y", 11)
							.attr("text-anchor", "middle")
							.style("font-size", "8px").style("font-weight", "bold")
							.style("cursor", typeof this.onMonthClick === "function" ? "pointer" : "default")
							.text(month_label) ;

						if (typeof this.onMonthClick === "function") {
							txt_col.on("click", () => {
								this._fireMonthClick({ div_foot, year, month, data_month }) ;
							}) ;
						}

					} else {

						//--- block — foreignObject
						const label_fo  = svg.append("foreignObject")
							.attr("x", 0).attr("y", 0).attr("width", width).attr("height", 16) ;

						const label_div = label_fo.append("xhtml:div")
							.style("text-align", "center").style("font-size", "8px")
							.style("font-weight", "bold").style("line-height", "14px") ;

						if (typeof this.onMonthClick === "function" || div_foot !== "") {
							label_div.append("xhtml:a")
								.style("cursor", "pointer").style("text-decoration", "none").style("color", "inherit")
								.text(month_label)
								.on("click", () => {
									this._fireMonthClick({ div_foot, year, month, data_month }) ;
								}) ;
						} else {
							label_div.text(month_label) ;
						}
					}

					//--- jours
					const days  = d3.time.days(new Date(year, month-1, 1), new Date(year, month, 1)) ;
					const week0 = _week(new Date(year, month-1, 1)) ;

					const _x = (d) => {
						if (mode === "block" ) return parseInt(_day(d)) * cs ;
						if (mode === "column") return 0 ;
						return (d.getDate() - 1) * cs + 45 ;
					} ;
					const _y = (d) => {
						if (mode === "block" ) return (parseInt(_week(d)) - parseInt(week0)) * cs + shift_up ;
						if (mode === "column") return (d.getDate() - 1) * cs_col_h + 16 ;
						return 2 ;
					} ;

					var rect = svg.selectAll(".cal_day")
						.data(days).enter().append("rect")
						.attr("class", "cal_day")
						.attr("stroke", "#ccc").attr("stroke-width", "0.5px")
						.attr("width", cs_w).attr("height", cs_h)
						.attr("rx", 2).attr("ry", 2)
						.attr("x", _x).attr("y", _y)
						.attr("fill",       d => this.getClr(d, ctx))
						.attr("data-date",  d => fmt(d))
						.attr("data-value", d => (fmt(d) in data_month) ? data_month[fmt(d)] : "")
						.attr("opacity", 0) ;

					//--- tooltip
					rect.filter(d => fmt(d) in data_month).append("title").text(d => {
						const v    = data_month[fmt(d)] ;
						const prev = this.getPrev(fmt(d), ctx) ;
						var tip    = fmt(d) + " : " + this.fmtVal(v) ;
						if (this.color_mode === "delta" && prev !== null) tip += "  (J-1 : " + this.fmtVal(prev) + ")" ;
						return tip ;
					}) ;

					this.animateRects(rect) ;

					//--- events — pattern invariant
					this.attachEvents(rect, ctx) ;

					//--- labels jours
					const day_names = ["Dim","Lun","Mar","Mer","Jeu","Ven","Sam"] ;

					if (show_day) {

						if (mode === "column") {

							svg.selectAll(".lbl_dow").data(days).enter().append("text")
								.attr("class","lbl_dow").attr("x",3)
								.attr("y", d => _y(d) + Math.max(cs_col_h*0.65,7))
								.style("font-size","7px").style("fill","#888").style("pointer-events","none")
								.text(d => day_names[d.getDay()]) ;

							svg.selectAll(".lbl_day").data(days).enter().append("text")
								.attr("class","lbl_day").attr("x", col_w-4)
								.attr("y", d => _y(d) + Math.max(cs_col_h*0.65,7))
								.attr("text-anchor","end")
								.style("font-size","7px").style("fill","#555").style("pointer-events","none")
								.text(d => d.getDate()) ;

						} else {

							svg.selectAll(".lbl_dow").data(days).enter().append("text")
								.attr("class","lbl_dow")
								.attr("x", d => (_x(d) + cs/2) - 5)
								.attr("y", d => _y(d) + Math.max(cs*0.35,7))
								.attr("text-anchor","middle")
								.style("font-size", Math.max(cs*0.28,5)+"px")
								.style("fill","#888").style("pointer-events","none")
								.text(d => day_names[d.getDay()]) ;

							svg.selectAll(".lbl_day").data(days).enter().append("text")
								.attr("class","lbl_day")
								.attr("x", d => _x(d)+2)
								.attr("y", d => _y(d) + Math.max(cs*0.70,13))
								.style("font-size", Math.max(cs*0.28,6)+"px")
								.style("fill","#555").style("pointer-events","none")
								.text(d => d.getDate()) ;
						}
					}

					//--- line2
					if (line2_mode !== "none") {

						svg.selectAll(".lbl_val")
							.data(days.filter(d => fmt(d) in data_month))
							.enter().append("text")
							.attr("x", d => _x(d) + (mode==="column" ? col_w/2 : cs/2))
							.attr("y", d => _y(d) + (mode==="column" ? cs_col_h*0.78 : cs*0.78))
							.attr("text-anchor","middle")
							.style("font-size", mode==="column" ? "7px" : Math.max(cs*0.32,7)+"px")
							.style("pointer-events","none")
							.style("fill", d => {
								if (this.color_mode === "delta") {
									const prev = this.getPrev(fmt(d), ctx) ;
									if (prev === null) return "#aaa" ;
									return data_month[fmt(d)] > prev ? "#2e7d32" : "#c62828" ;
								}
								return data_month[fmt(d)] >= this.threshold ? "#2e7d32" : "#c62828" ;
							})
							.text(d => {
								const v = data_month[fmt(d)] ;
								if (line2_mode === "arrow") {
									if (this.color_mode === "delta") {
										const prev = this.getPrev(fmt(d), ctx) ;
										if (prev === null) return "" ;
										return v > prev ? "▲" : "▼" ;
									}
									return v >= this.threshold ? "▲" : "▼" ;
								}
								if (line2_mode === "pct")   return (v*100).toFixed(1)+"%" ;
								if (line2_mode === "value") return this.fmtVal(v) ;
							}) ;
					}

					//--- registry
					window._odl_cal_registry[div_id] = {
						getClr  : (d) => this.getClr(d, ctx),
						getPrev : (d) => this.getPrev(d, ctx),
						fmtVal  : (v) => this.fmtVal(v),
						fmt, data:data_month
					} ;

					return { svg, div_id, div_foot, data:data_month } ;
				}



				//=========================================
				// enrichDates — this.objCsv = {} ; ;
				//=========================================

					enrichDates(params) {

						params = params || {} ;

						this.objCsv = {} ; ;
						
						console.log("enrichDates") ;console.log(params) ;

							const all_keys = Object.keys(this.data).sort() ;
									if (all_keys.length === 0) { console.warn("render_yearly > data vide") ; return ; }
									

						const year_min = parseInt(all_keys[0].substring(0,4)), year_max = parseInt(all_keys[all_keys.length-1].substring(0,4)) ;
						const nb_years = year_max - year_min + 1 ;

						
						var csvLst = all_keys.map(i_day => [i_day, this.data[i_day]]) ;
						
						var f_lst = ['Date', 'Close'], f_lst_new = [...f_lst], fld_pos = {} ;

						fld_pos = {}, f_lst = [] ;
							f_lst_new.forEach((fld, idx) => { fld_pos[fld] = idx, f_lst.push(fld) }) ;
	
	
						const idx_date = 0 ;
						

						  //---------------------------------------------------
						  //  #enrichDates  — PRIVÉE
						  //  Ajoute Year, YearMonth, YearWeek, Month, nDay, c1
						  //---------------------------------------------------
							//#enrichDates(objCsv, idx_date) {

								//const f_lst_new = [...objCsv.f_lst] ;

								const cols_add  = ["Year", "YearMonth", "YearWeek", "Month", "nDay"] ;

									//---------------------------------------------------
									//  #enrichDates — PRIVÉE
									//  Ajoute Year, YearMonth, YearWeek, Month, nDay
									//---------------------------------------------------

									cols_add.forEach(c => {
										if (!f_lst_new.includes(c)) f_lst_new.push(c);
									});

										csvLst.forEach(row => {

											// ajouter les nouvelles colonnes vides
											cols_add.forEach(() => row.push(""));

											const fld_date = row[idx_date];
											if (!fld_date) return;

											const d = new Date(fld_date);
											const y = d.getFullYear();
											const m = String(d.getMonth() + 1).padStart(2, "0");

											const d_jan1 = new Date(y, 0, 1);
											const n_week = Math.ceil(((d - d_jan1) / 86400000 + d_jan1.getDay() + 1) / 7);
											const yw = y + "_W" + String(n_week).padStart(2, "0");

											const nDay = d.getDay();

												cols_add.forEach(c => {

													const idx = f_lst_new.indexOf(c);

													if      (c === "Year")      row[idx] = String(y);
													else if (c === "YearMonth") row[idx] = y + "_" + m;
													else if (c === "YearWeek")  row[idx] = yw;
													else if (c === "Month")     row[idx] = m;
													else if (c === "nDay")      row[idx] = nDay;

												});

										});

									fld_pos = {}, f_lst = [] ;
										f_lst_new.forEach((fld, idx) => { fld_pos[fld] = idx, f_lst.push(fld) }) ;
																	
															
									var objCsv =  {csvLst, f_lst, fld_pos } ;
													
								//===============================================


									const wrk_lst1 = ['Date', "Year", "YearMonth", "YearWeek"]

											wrk_lst1.forEach((f_name, index) => {
													fld_p = f_lst.indexOf(f_name);	//Date
												objCsv['gby_'+f_name] = get_GbyLst ({"data_src":objCsv.csvLst, "pKey_gby":fld_p}) ;	//, "pKey_sum":2

												objCsv['nb_'+f_name] = objCsv['gby_'+f_name].length ;
											});
											
								console.log("objCsv") ;console.log(objCsv) ;
					
							this.objCsv = objCsv ;
						
						
						

					} 

				//=========================================
				// render_yearly — 1 SVG par année heatmap
				//=========================================
					/*

											cal.render({ mode:"yearly", div_create:true,  }) ;


								const style = "text-align:left;margin-top:0.25rem;margin-bottom:0.25rem;padding:0.1rem;border:0px dotted orange;border-radius:12px;";

									div_tg2 = createDivFromObject({div_tgt:div_tg, style})
									div_tg3 = createDivFromObject({div_tgt:div_tg, style})

										fld_a = JSON.stringify(meta_infos) ;
								html_c1 = "<p style='text-align:left;font-size:1rem;margin-right:1rem;'>"+fld_a+"</p>"
									$("#"+div_tg2).append(html_c1);



							const card1 = createHtmlCard0({ div_tgt:div_tg2, title:"Cours", content:"82.93 €", color:"green" }) ;

							// plus tard — update du contenu
								//$("#" + card1).html("83.10 €") ;


							createHtmlCard0({ div_tgt:div_tg2, title:"Cours actuel",  content:"82.93 €", color:"" }) ;
							createHtmlCard0({ div_tgt:div_tg2, title:"Cours actuel",  content:"82.93 €", color:"green" }) ;
							
							//createHtmlCard0({ div_tgt:sel_div, title:"Variation",     content:"-1.2 %",  color:"red"   }) ;
							//createHtmlCard0({ div_tgt:sel_div, title:"Volume",        content:"4.2M",    color:"blue"  }) ;


						*/



				render_yearly(params) {

						console.log("render_yearly") ;console.log(params) ;
					
					
					params = params || {} ;

					const _set_menu = params.set_menu || true  ;
					const div_create = params.div_create || false ;


					//--- params dic YEARLY
						const YEARLY = {width   : 960, height : 136, cellSize    : 17, margin_left : 20, 	
									anim_total  : 5000, 	anim_delay  : 300 } ;

					const cs = YEARLY.cellSize, width = YEARLY.width, height = YEARLY.height ;

					const all_keys = Object.keys(this.data).sort() ;
						if (all_keys.length === 0) { console.warn("render_yearly > data vide") ; return ; }
						
						//---enrichDates > ajout cols 
							this.enrichDates(params);//'Year', 'YearMonth', 'YearWeek', 'Month', 'nDay']
							
								const objCsv = this.objCsv ;

					const year_min = parseInt(all_keys[0].substring(0,4)), year_max = parseInt(all_keys[all_keys.length-1].substring(0,4)) ;
					const nb_years = year_max - year_min + 1 ;
					const dur_year = Math.min(1000, Math.floor(YEARLY.anim_total / Math.max(nb_years,1))) ;

							console.log("render_yearly > bornes auto", year_min, year_max, "nb_years:", nb_years) ;
							console.log("render_yearly > ", "nb_Date/nb_YearMonth/nb_YearWeek", 
													[objCsv.nb_Date, objCsv.nb_YearMonth, objCsv.nb_YearWeek]) ;

					const fmt   = d3.time.format("%Y-%m-%d"), _week = d3.time.format("%U") ;

				//-----
					var div_calMain = this.div_tgt, div_calHead = "", div_menu = "", div_calYear = div_calMain ;
						//const div_2 = "div_"+Makeid(5) ;
							//html_c1 = '<div id="'+div_2+'" style="margin:0;padding:0.1rem;border:0px dotted '+fld_c+';border-radius:12pt;"></div>', 
							//$("#"+div_1).append(html_c1); 
							
					
					
					var data_cal = this.data ;
					

							if (_set_menu==false ) {
								
								//_showYearCal({}) ;

								this.render_yearly_final({year_min, year_max, div_calYear, div_create}) ;


							} else {
								
									//this.menu_yearly = true ;
								
								var style = "text-align:left;margin-top:0.25rem;margin-bottom:0.25rem;padding:0.1rem;border:0px dotted orange;border-radius:12px;";

									div_calHead = createDivFromObject({div_tgt:div_calMain, style, center:true});

								style = "text-align:left;font-size:10px;margin:0rem;padding:0rem;border:0px dotted orange;border-radius:12px;";

										div_menu = createDivFromObject({div_tgt:div_calHead, style, center:true});
										div_calYear = createDivFromObject({div_tgt:div_calHead, style, center:true});

										//radioItems_lst = iso_code_lst.map(i_iso3 => [i_iso3, isoLocDic_r[i_iso3]]) ;
										var radioItems_lst = [["A", "Years"], ["B", "Months"], ["C", "Lines"]] ;

																						
					//this.div_tgt = div_calYear ;
						
						//_showYearCal({}) ;

								this.render_yearly_final({year_min, year_max, div_calYear, width, height, div_create}) ;

												_setHtmlRadioClick2({
																div_tgt:div_menu, radioItems_lst:radioItems_lst, 
																//RadioPostClick:RadioPostClick0
																//RadioPostClick: (res_params) => console.log("Sélection actuelle :", res_params)

																RadioPostClick: (res_params) => {
																				
																		console.log("click > "+res_params.value)

																	$("#"+div_calYear).html('') ;
														
																					//render yearly
																			if (res_params.value=="A") {
																				
																					//_showYearCal({}) ;
																				this.render_yearly_final({year_min, year_max, div_calYear, div_create}) ;
																				
																					//render monthly
																			} else if (res_params.value=="B") {

																				//$("#"+div_calYear).html('') ;

																					const params_m = {...params} ;
																						
																						params_m.div_tgt = div_calYear, params_m.mode = "line" ;
																						
																						this.div_tgt = div_calYear ;
																					
																					//this.render(params_m) ;
																					//this.render_month(params_m) ;
																					
																					this.render_year(params_m) ;

																						return ;
																					//params = params || {} ;

																					//const mode = params.mode || "line" ;
																			} else if (res_params.value=="C") {

																					//lines 
																					
																			//{"date":"20111001","New York":"63.4","San Francisco":"62.7","Austin":"72.2"},
																		//_D3v3_BivariatesLines({div_tgt, data_rec, ind_lst:[sans date], fld_date:'');
																			//return var oD3Chart = {svg, g, width,  height, div_chart, div_details, data:cities} ;
																					
																					//objCsv = this.objCsv ;				

																				var data_rec = all_keys.map(i_date => [{Date:i_date, value:this.data[i_date]}][0])
																										.keySort('Date', false)
																																																	
																						_D3v3_BivariatesLines({div_tgt:div_calYear, data_rec, onZero:true,
																												height:150,
																												ind_lst:["value"], fld_date:'Date'});


																			
																			} 
																						

																		}

															}) ;
												


							}
							
							
						
				
				} ;

				//=========================================



					render_yearly_final(params) {

							console.log("render_yearly_final") ;console.log(params) ;

							//render_yearly_final({year_min, year_max}) ;
							const {year_min, year_max, div_calYear, div_create} = params ;

									//aff calYear
										
								const fmt   = d3.time.format("%Y-%m-%d"), _week = d3.time.format("%U") ;
								//--- params dic YEARLY
									const YEARLY = {width   : 960, height : 136, cellSize    : 17, margin_left : 20, 	
												anim_total  : 5000, 	anim_delay  : 300 } ;

								var  cs = YEARLY.cellSize ;
								
									var width = YEARLY.width, height = YEARLY.height ;

								const all_keys = Object.keys(this.data).sort() ;
									if (all_keys.length === 0) { console.warn("render_yearly > data vide") ; return ; }

								//const year_min = parseInt(all_keys[0].substring(0,4)), year_max = parseInt(all_keys[all_keys.length-1].substring(0,4)) ;
								const nb_years = year_max - year_min + 1 ;
								const dur_year = Math.min(1000, Math.floor(YEARLY.anim_total / Math.max(nb_years,1))) ;


										var year_idx = 0, divFeats_lst = [] 


									//idealement il faudrait avoir une fct unitaire de creation du block yearly
									//pas imbriquée dans une boucle car en amont du planning devra etre insere un div_feat ( features)
											for (var year = year_max ; year >= year_min ; year--, year_idx++) {

												const year_str = "" + year, data_year = {} ;
												
												
												//data_cal
													
													Object.keys(this.data)
													//Object.keys(data_cal)
														.filter(k => k.startsWith(year_str))
														.forEach(k => { data_year[k] = this.data[k] ; }) ;

													if (Object.keys(data_year).length === 0) continue ;

													const vals         = Object.values(data_year) ;
													const avg_year     = vals.reduce((a,b) => a+b,0) / vals.length ;
													const border_color = this.border_color || (avg_year >= this.threshold ? "#4caf50" : "#e53935") ;

													const v_abs = Math.max(Math.abs(Math.min(...vals)), Math.abs(Math.max(...vals))) ;
													const color = d3.scale.linear().domain([-v_abs,0,0,v_abs]).range(this.colors) ;

													//--- ctx — data_month = data_year pour moteurs communs
													const ctx = { fmt, data_month:data_year, color, _week, div_foot:"", year, month:0 } ;

													//const cont   = document.getElementById(this.div_tgt) ;
													const cont   = document.getElementById(div_calYear) ;
														const div_feat = "div_cal_" + Makeid(6), div_id = "div_cal_" + Makeid(6) ;
														
														divFeats_lst.push(div_feat) ;

														cont.insertAdjacentHTML("beforeend", `<div id="${div_feat}" style="display:block;width:${width}px;margin:0.1rem 0;">div_feat</div>`) ;
														cont.insertAdjacentHTML("beforeend", `<div id="${div_id}" style="display:block;width:${width}px;margin:0.1rem 0;"></div>`) ;

														var svg_sel = d3.select("#" + div_id).append("svg")
																		.attr("width", width).attr("height", height).style("border-left", "4px solid " + border_color) ;

														//--- label année vertical
														svg_sel.append("text")
															.attr("transform", "translate(10,"+(height/2+10)+")rotate(-90)")
															.attr("text-anchor", "middle")
															.style("font-size","10px").style("font-weight","bold")
															.text(year) ;

													var svg = svg_sel.append("g")
														.attr("transform", "translate("+YEARLY.margin_left+",30)") ;

													const days  = d3.time.days(new Date(year,0,1), new Date(year+1,0,1)) ;
													const week0 = parseInt(_week(new Date(year,0,1))) ;

													const _x = (d) => (parseInt(_week(d)) - week0) * cs ;
													const _y = (d) => d.getDay() * cs ;

													var rect = svg.selectAll(".cal_day_y")
														.data(days).enter().append("rect")
														.attr("class","cal_day_y")
														.attr("stroke","#ccc").attr("stroke-width","0.3px")
														.attr("width", cs-1).attr("height", cs-1)
														.attr("rx",1).attr("ry",1)
														.attr("x", _x).attr("y", _y)
														.attr("fill",       d => this.getClr(d, ctx))
														.attr("data-date",  d => fmt(d))
														.attr("data-value", d => (fmt(d) in data_year) ? data_year[fmt(d)] : "")
														.attr("opacity", 0) ;

													//--- tooltip
													rect.filter(d => fmt(d) in data_year).append("title").text(d => {
														const v    = data_year[fmt(d)] ;
														const prev = this.getPrev(fmt(d), ctx) ;
														var tip    = fmt(d) + " : " + this.fmtVal(v) ;
														if (this.color_mode === "delta" && prev !== null) tip += "  (J-1 : " + this.fmtVal(prev) + ")" ;
														return tip ;
													}) ;

													//--- contours mois
													const months = d3.time.months(new Date(year,0,1), new Date(year+1,0,1)) ;
													svg.selectAll(".month-border").data(months).enter().append("path")
														.attr("class","month-border")
														.attr("fill","none").attr("stroke","#000").attr("stroke-width","1px")
														.attr("d", (t0) => {
															const t1 = new Date(t0.getFullYear(), t0.getMonth()+1, 0) ;
															const d0 = t0.getDay() ;
															const w0 = parseInt(_week(t0)) - week0 ;
															const d1 = t1.getDay() ;
															const w1 = parseInt(_week(t1)) - week0 ;
															return "M"+(w0+1)*cs+","+d0*cs
																 + "H"+w0*cs        +"V"+7*cs
																 + "H"+w1*cs        +"V"+(d1+1)*cs
																 + "H"+(w1+1)*cs    +"V"+0
																 + "H"+(w0+1)*cs    +"Z" ;
														}) ;

													//--- animation sans delay individuel
													rect.attr("opacity",0)
														.transition()
														.duration(dur_year)
														.delay(year_idx * YEARLY.anim_delay)
														.attr("opacity",1) ;

													//--- events — pattern invariant
													this.attachEvents(rect, ctx) ;

													//--- div_foot + click année si div_create
													var div_foot = "" ;
													if (div_create) {
														div_foot      = "div_cal_" + Makeid(6) ;
														const f_style = `width:99%;text-align:left;display:none;font-size:11px;margin:0.1rem;` ;
														cont.insertAdjacentHTML("beforeend", `<div id="${div_foot}" style="${f_style}"></div>`) ;

														//--- click label année — ouvre div_foot + callback
														svg_sel.select("text").style("cursor","pointer")
															.on("click", () => {
																this._fireMonthClick({ div_foot, year, month:0, data_month:data_year }) ;
															}) ;
													}

													//--- registry
														window._odl_cal_registry[div_id] = {
															getClr  : (d) => this.getClr(d, ctx),
															getPrev : (d) => this.getPrev(d, ctx),
															fmtVal  : (v) => this.fmtVal(v),
															fmt, data:data_year
														} ;
												
												
											}
											
											
											//à revoir / objectif avoir la liste des divs crees au dessus du plng yearly > radioBtn
										this.divFeats_yearly = divFeats_lst = [] 

						
								

					} ;



				//=========================================
				// render_year — boucle années → mois → render_month
				//=========================================
				render_year(params) {

					params = params || {} ;

					const month_mode = params.month_mode || "block" ;

					const all_keys = Object.keys(this.data).sort() ;
						if (all_keys.length === 0) { console.warn("render_year > data vide") ; return ; }

						const year_min = parseInt(all_keys[0].substring(0,4)), year_max = parseInt(all_keys[all_keys.length-1].substring(0,4)) ;

						var month_params = {mode : month_mode, 	year : y, month : m,
										show_day   : params.show_day   !== undefined ? params.show_day : this.show_day,
										line2_mode : params.line2_mode || this.line2_mode, div_create : params.div_create || false
								} ;

							if ("div_tgt" in params) {
								month_params.div_tgt = params.div_tgt ;
								
								this.div_tgt = params.div_tgt ;

							}

						for (var y = year_max ; y >= year_min ; y--) {
							for (var m = 12 ; m >= 1 ; m--) {
								/*
									this.render_month({mode : month_mode,
										year       : y, month      : m,
										show_day   : params.show_day   !== undefined ? params.show_day : this.show_day,
										line2_mode : params.line2_mode || this.line2_mode, div_create : params.div_create || false
									}) ;
								*/
								month_params.year = y, month_params.month = m ;
								
								this.render_month(month_params) ;
							}
						}
				}


				//=========================================
				// render — point d'entrée unique
				//=========================================
				render(params) {

					params = params || {} ;

					const mode = params.mode || "line" ;

					if      (mode === "year"  ) this.render_year(params) ;
					else if (mode === "yearly") this.render_yearly(params) ;
					else                        this.render_month(params) ;

					return this ;
				}

			
	}


//======================================================================================================
// Exemples d'utilisation
//======================================================================================================

/*

// --- workflow 1 — 1 mois avec callbacks
var cal = new D3Class_YearMonthCalendars({
    div_tgt      : "div_content1",
    data         : myData,
    color_mode   : "delta",
    value_format : "raw",
    onMonthClick : ({ div_foot, year, month, data }) => {
        // caller décide quoi mettre dans div_foot
        const data_lst = Object.keys(data).map(i => [i, data[i]]) ;
        _d3v3_vBartSortable_1({ div_tgt:div_foot, data_lst, height:150,
            fld_pos:[0,1], axysY_name:year+' '+month }) ;
    },
    onDayClick   : ({ div_foot, year, month, day, value }) => {
        console.log("day clicked", day, value) ;
    }
}) ;
cal.render({ mode:"line", year:2026, month:3, div_create:true }) ;


// --- workflow 2 — mode yearly avec div_foot
cal.render({ mode:"yearly", div_create:true }) ;


// --- workflow 3 — changement ticker
document.getElementById("div_content1").innerHTML = "" ;
cal.setData({ data:newData }) ;
cal.render({ mode:"yearly" }) ;


// --- workflow 4 — chainage
new D3Class_YearMonthCalendars({ div_tgt:"div_content1", data:myData })
    .render({ mode:"yearly" }) ;

*/


//======================================================================================================
// v0
//======================================================================================================

//======================================================================================================
// D3Class_YearMonthCalendars
// Classe calendrier heatmap mensuel/annuel — D3.v3
// Basée sur _D3v3_render1MonthCal_1b
// Modes : "line" | "block" | "column" | "year" | "yearly"
//======================================================================================================


//======================================================================================================
// Exemples
//======================================================================================================

/*

// workflow 1 — 1 mois
var cal = new D3Class_YearMonthCalendars({ div_tgt:"div_content1", data:myData }) ;
cal.render({ mode:"block", year:2025, month:3 }) ;

// workflow 2 — mode year — tous les mois en block
cal.render({ mode:"year", month_mode:"block" }) ;

// workflow 3 — mode yearly — 1 ligne par année heatmap
cal.render({ mode:"yearly" }) ;

// workflow 4 — changement ticker
document.getElementById("div_content1").innerHTML = "" ;
cal.setData({ data:newData }) ;
cal.render({ mode:"yearly" }) ;

// workflow 5 — chainage
new D3Class_YearMonthCalendars({ div_tgt:"div_content1" })
    .setData({ data:myData })
    .render({ mode:"yearly" }) ;

*/







//======================================================================================================
// Exemple d'utilisation
//======================================================================================================

/*

// --- workflow 1 — tout d'un coup
var cal = new D3Class_YearMonthCalendars({
    div_tgt      : "div_content1",
    data         : myData,
    color_mode   : "delta",
    value_format : "raw"
}) ;
cal.render({ mode:"block", year:2025, month:3 }) ;


// --- workflow 2 — init tôt, data tard
var cal = new D3Class_YearMonthCalendars({ div_tgt:"div_content1" }) ;
// ... plus tard ...
cal.setData({ data:myData }) ;
cal.render({ mode:"line", year:2026, month:1 }) ;


// --- workflow 3 — mode year — bornes calculées automatiquement
var cal = new D3Class_YearMonthCalendars({
    div_tgt    : "div_content1",
    data       : myData,
    color_mode : "delta"
}) ;
cal.render({ mode:"year", month_mode:"block" }) ;


// --- workflow 4 — changement de données sans recréer l'instance
cal.setData({ data:newData }) ;
cal.render({ mode:"block", year:2026, month:3 }) ;


// --- workflow 5 — chainage
new D3Class_YearMonthCalendars({ div_tgt:"div_content1" })
    .setData({ data:myData })
    .render({ mode:"year" }) ;

*/




//------------------------------------------------------------
// _init_D3V3_YearlyCalendars
// Launcher — fetch CSV + dataPrep + appel composant
// En production : remplacer d3.csv par fetch depuis back_end
//
// params = {
//   div_tgt   : "div_content1"
//   csv_path  : "dji.csv"         -- chemin CSV (défaut: "dji.csv")
//   yearRange : [1990, 2011]       -- optionnel
//   onMouseOver / onMouseMove / onMouseOut / onClick
// }
//------------------------------------------------------------
//fichier .csv


	function _init_D3Class_YearMonthCalendars0(params) 
	{


		console.log("_init_D3Class_YearMonthCalendars0") ;console.log(params) ;

		var div_tgt = params.div_tgt || "" ;
			//: "div_content1"
			
			if (div_tgt=="") {
			
				return ;
			}
			

		var csv_path = params.csv_path || "";


				csv_path = "dji.csv"; ;
				
				
		var param_b = {...params} ;
				
				//2010-10-01
				
			d3.csv(csv_path, function(error, csv) {
				if (error) throw error;

					//--- dataPrep : format plat CSV → objet mappé date → valeur
					var data = d3.nest()
						.key(function(d) { return d.Date; })
						.rollup(function(d) { return (d[0].Close - d[0].Open) / d[0].Open; })
						.map(csv);

						// v3 — remplacer .object() par .map()
						/*
							var data = d3.nest()
								.key(function(d) { return d.Date; })
								.rollup(function(d) { return (d[0].Close - d[0].Open) / d[0].Open; })
								.map(csv);
						*/
			
			
				//--- injection data + appel composant
					param_b.data = data;
						//D3V3_YearlyCalendars1(params);
			
			
						console.log(data) ;


						// --- workflow 1 — tout d'un coup
						/*
							var cal = new D3Class_YearMonthCalendars({
								div_tgt      : "div_content1",
								data         : data, div_create:true, 
								color_mode   : "delta", value_format : "raw"
							}) ;
						*/



							// --- workflow 1 — 1 mois avec callbacks
							var cal = new D3Class_YearMonthCalendars({
								div_tgt : div_tgt, 
								data         : data,
								color_mode   : "delta",  value_format : "raw",
								
								onMonthClick : ({ div_foot, year, month, data }) => {
									
									// caller décide quoi mettre dans div_foot
									const data_lst = Object.keys(data).map(i => [i, data[i]]) ;
									_d3v3_vBartSortable_1({ div_tgt:div_foot, data_lst, height:150,
										fld_pos:[0,1], axysY_name:year+' '+month }) ;
								
								},
								onDayClick   : ({ div_foot, year, month, day, value }) => {
								
									console.log("day clicked", day, value) ;

								}
							}) ;


						
						/*
						
							cal.render({ mode:"block", year:2010, month:1 }) ;
							cal.render({ mode:"line", year:2010, month:1 }) ;
							cal.render({ mode:"column", year:2010, month:1 }) ;
						
						*/

						//document.getElementById("div_content1").innerHTML = "" ;
							//cal.render({ mode:"year", month_mode:"line" }) ;

							cal.render({ mode:"line", year:2010, month:1, div_create:true,  }) ;

							// workflow 3 — mode yearly — 1 ligne par année heatmap
							cal.render({ mode:"yearly", div_create:true,  }) ;
									
			
			
			});




		//----------------------------------------

				function _setMenu(params_b) 
				{


					console.log("_setMenu") ;console.log(params) ;

					var p1 = params.csv_path || "";
				
				
	
	
				} ;
	

	
	
	
	} ;
	
//--------------------------------

	

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//---------------------------------------------------------------------------------------



												
		//_getDataPhpX({value:"Lines"})				
	function _getDataPhpX(params) 
	{


		console.log("_getDataPhpX") ;console.log(params) ;

		var div_tg = params.div_tgt || "" ;
			//: "div_content1"
			
		var afterLoadFunc ;
		
			if ('afterLoadFunc' in params) afterLoadFunc = params.afterLoadFunc ;

		//---------------------------------

		//+ " WHERE Date IN ('2025-06-10', '2025-06-13', '2025-06-16', '2025-06-18', '2025-07-03')"


		//---------------------------------
			var url_pref = "", f_url = "", p_sql = "";
					
					f_url = "https://france-infos.net/front-end/_php/php_dbquery_yahoo1b.php?p_cmd=getHistoPh";//p&date1=toto
					f_url = "https://france-infos.net/front-end/_php/php_dbquery_yahoo1b.php?p_cmd=getHistoPhp&nb_days=20" ;
				//getHisto_per
					f_url = "https://france-infos.net/front-end/_php/php_dbquery_yahoo1b.php?p_cmd=getHisto_per&nb_days=20" ;
					

				url_pref = "https://france-infos.net/front-end/_php/php_dbquery_global_bgi2c.php?dbname=u104133027_mysql3&p_output=csv_only&p_Sql="



					p_sql = "SELECT `Date`, `stock`, `Close`, `v_perc` FROM `stocks_daily_test` "
							//+ " WHERE Date IN ('2025-06-10', '2025-06-13', '2025-06-16', '2025-06-18', '2025-07-03')"
							//+ " WHERE Date IN ('"+allDays0.join("', '")+"')" ;
							//+ " WHERE (Date >2026-01-01 AND Date <2026-03-31) " ;
							+ " WHERE Date BETWEEN '2026-01-01' AND '2026-03-31'"
							+ " ORDER BY stock ASC, Date asc;" 


					 f_url =  url_pref + p_sql + ";"
					 
				let encoded = encodeURI(f_url);
					
				/*
					//assets/img/Loading_21.webp
								fld_n = "assets/img/Loading_21.webp"
								fld_n = "assets/img/loader.gif"
							html_c1 = '<img style="padding:0.25rem;height:150px;margin:1rem;margin-top:3rem;border-radius:12pt;" class="" src="'+fld_n+'" alt="wait loading" border=0>'
						const w_img = "<span style='margin:0.25rem;'>"+html_c1+""+"</span>" ; 
					
							//$('#'+div_tgt2).html("Loading");
							//$("#"+div_tgt).html("").css({'display':'block'}); 
							//$("#"+div_tgt).append("<center>"+w_img+"</center>"); 
								
				*/
						
							//-----------------------------------
							
							var objCsv = {}, stock_dic = {} ;
							
									fld_n = "";
									
								(async () => {
								
								
								console.log(p_sql) ;

										//===============================================
										//const data_php0 = await _JSONfetch_simple(encoded);

												objCsv = await _TXTfetch_simple1({p_url:encoded, csv_delim:',', 
																	
																	fld_num:['Close','v_perc'], 
																	uniq_lst:['Date', 'stock'], 
																	
																	//afterLoadFunc:_afterLoad0,
																	//dIn_id

																	add_cols:{ 'c1':{type:'fixe', value:'1'}, 
																				//'year_iso':{type:'concat', flds:['iso_code', 'date']},
																			},
																	
																});

													console.log("-----------data_php0") ;console.log(objCsv) ;
				

													// Gestion erreur (optionnel)
														if (objCsv._error) {
															console.warn("Erreur fetch1:", objCsv.error);
															
															objCsv = {"error":true} ; 
														} ;
														
																
											//var fld_pos = objCsv.fld_pos || {} ;
											
											var {csvLst, f_lst, fld_pos } = objCsv
																
																
													csvLst = csvLst.filter(d_item => d_item[0]!='') ;
														
										//===============================================
														


								const cat_lst0 = ['---', 'Aerospace & Defense', 'Asia', 'Banks & Finance', 'Crypto', 'Energy', 'Healthcare & Pharma', 
														'Home Depot', 'Indexes', 'Industrials', 'Luxury & Consumer', 'Tech', 'Telecom & Media', 'Utilities & Commodities']
											
												fld_n = "Category Name"
												fld_n = "secteur"
												wrk_dic2 = {} ;
												
											csvLst.keySort(0, false).forEach((d_item, index) => {
												//fld_i = d_item[1], fld_l = (''+fld_i).split('-'),
												
												fld_i = d_item[1], //stock
													wrk_dic1 = {s:fld_i, n:fld_i, cat:'---', iso3:''} ;	
													
													if (fld_i in stock_dic) {
														wrk_dic1.n = stock_dic[fld_i].Name, wrk_dic1.cat = stock_dic[fld_i][fld_n],
														wrk_dic1.iso3 = stock_dic[fld_i]["Country"];
													}
													
														if (cat_lst0.includes(wrk_dic1.cat)==false) wrk_dic1.cat = '---' ;
													
													if ((fld_i in wrk_dic2)==false) { wrk_dic2[fld_i] = {v0:d_item[2]} } ;
														fld_k = roundToXDigits(100*d_item[2]/wrk_dic2[fld_i].v0, 3) ;//v_perf
														
														fld_t = "positive" ; if (d_item[3]<0) fld_t = "négative" ;
														
													d_item.push(fld_t, fld_k, wrk_dic1.n, wrk_dic1.cat, wrk_dic1.iso3, 1) ;
												
												
											}), f_lst.push('v_sign', 'v_perf', 'name', 'cat', 'Country', 'c1') ;
											
											//['2026-02-26', 'ERF.PA', 67.7, 0.77]


								//var fld_pos = {} ;

									f_lst.forEach((fld, idx) => { fld_pos[fld] = idx ; }) ;


								//---enrichissement : calcul v_delta + v_perc si "Close" présent
								
							//var objCsv2 = {} ;

									if (fld_pos["Close"] !== undefined) {
											//objCsv = _enrichData_0({ objCsv:{csvLst, f_lst, fld_pos, } })
											//objCsv2 = _enrichData_0({csvLst, f_lst, fld_pos})
									}


					//objCsv = {csvLst, f_lst, fld_pos, } ;
						//console.log(objCsv2) ;
				//var {csvLst, f_lst, fld_pos } = objCsv2
						//console.log(objCsv) ;
									
										//===============================================
						
							//var fld_pos   = objCsv.fld_pos, idx_close = fld_pos["Close"] ;
							var f_lst_new = [...f_lst] ;
							
								if (!f_lst_new.includes("v_delta")) f_lst_new.push("v_delta") ;
								if (!f_lst_new.includes("v_perc"))  f_lst_new.push("v_perc") ;

							const idx_delta = f_lst_new.indexOf("v_delta"), idx_perc  = f_lst_new.indexOf("v_perc") ;
							const idx_date = f_lst_new.indexOf("Date"), idx_close = fld_pos["Close"] ;

								csvLst.forEach((row, i) => {

									if (i === 0) {
										row[idx_delta] = 0;
										row[idx_perc]  = 0;
										return;
									}

									const close_cur  = parseFloat(row[idx_close]);
									const close_prev = parseFloat(csvLst[i - 1][idx_close]);

									const v_delta = roundToXDigits(close_cur - close_prev, 2);

									const v_perc = close_prev !== 0
										? roundToXDigits((100 * v_delta / close_prev), 2)
										: 0;

									row[idx_delta] = v_delta, row[idx_perc]  = v_perc;

								});

						fld_pos = {}, f_lst = [] ;
							f_lst_new.forEach((fld, idx) => { fld_pos[fld] = idx, f_lst.push(fld) }) ;



						  //---------------------------------------------------
						  //  #enrichDates  — PRIVÉE
						  //  Ajoute Year, YearMonth, YearWeek, Month, nDay, c1
						  //---------------------------------------------------
							//#enrichDates(objCsv, idx_date) {

								//const f_lst_new = [...objCsv.f_lst] ;

								const cols_add  = ["Year", "YearMonth", "YearWeek", "Month", "nDay"] ;

									//---------------------------------------------------
									//  #enrichDates — PRIVÉE
									//  Ajoute Year, YearMonth, YearWeek, Month, nDay
									//---------------------------------------------------

									cols_add.forEach(c => {
										if (!f_lst_new.includes(c)) f_lst_new.push(c);
									});

										csvLst.forEach(row => {

											// ajouter les nouvelles colonnes vides
											cols_add.forEach(() => row.push(""));

											const fld_date = row[idx_date];
											if (!fld_date) return;

											const d = new Date(fld_date);
											const y = d.getFullYear();
											const m = String(d.getMonth() + 1).padStart(2, "0");

											const d_jan1 = new Date(y, 0, 1);
											const n_week = Math.ceil(((d - d_jan1) / 86400000 + d_jan1.getDay() + 1) / 7);
											const yw = y + "_W" + String(n_week).padStart(2, "0");

											const nDay = d.getDay();

												cols_add.forEach(c => {

													const idx = f_lst_new.indexOf(c);

													if      (c === "Year")      row[idx] = String(y);
													else if (c === "YearMonth") row[idx] = y + "_" + m;
													else if (c === "YearWeek")  row[idx] = yw;
													else if (c === "Month")     row[idx] = m;
													else if (c === "nDay")      row[idx] = nDay;

												});

										});


						fld_pos = {}, f_lst = [] ;
							f_lst_new.forEach((fld, idx) => { fld_pos[fld] = idx, f_lst.push(fld) }) ;
														
												
				objCsv =  {csvLst, f_lst, fld_pos } ;
										
											
										//===============================================
										
											fld_p = f_lst.indexOf('cat');	//Date
										//wrk_lst1 = objCsv.csvLst.map(d_item => [d_item[fld_p], 1]);
										gby_cat = get_GbyLst ({"data_src":csvLst, "pKey_gby":fld_p}) ;	//, "pKey_sum":2

											console.log("--cat_lst > ") ;console.log(gby_cat.keySort(0, false)) ;

									//objCsv2.gby_cat = gby_cat ;
									
										//===============================================


								wrk_lst1 = ['Date', 'stock', 'secteur', "Year", "YearMonth", "YearWeek"]

											wrk_lst1.forEach((f_name, index) => {

													fld_p = f_lst.indexOf(f_name);	//Date
												objCsv['gby_'+f_name] = get_GbyLst ({"data_src":objCsv.csvLst, "pKey_gby":fld_p}) ;	//, "pKey_sum":2

												
											});
											
	
											
						if (afterLoadFunc) {
							afterLoadFunc ({objCsv}) ;
						} ;
								
											
						if (div_tg=="") {
							return {objCsv} ;
						} ;

 
										//===============================================
										//---------------------
	
									//cumul par top / sexe
										var gby_keys = ['cat', 'Date', 'c1'], gby_agg = ["v_perf"], return_agg2 = ["count", "sum", "avg"] ;	//["*", "count", "sum", "avg", "lst", "lst_uniq"]

										var add_cols_end = { 'Indicator':{type:'fixe', value:"sexe"}, 
															//'year_iso':{type:'concat', flds:['iso_code', 'date']},
															}
										var rename_Fld = {"sum":"value"};	//{"old":"new"} ;//---rename sum - avg
										
										var oGbyV3 = {};
										
										//var oGbyV3 = get_GbyLst_v3 ({"data_src":objCsv.csvLst, "f_lst":objCsv.f_lst, 
										//								"gby_keys":gby_keys, "gby_agg":gby_agg, "return_agg":return_agg2, 

									
									//objCsv.oGbyV3 = oGbyV3 ;
									
									//console.log(e_days2) ;//e_date1 = wrk_dic1.date, e_date2 = ""
									
									//objCsv.Dates = {e_date1, e_date2, e_days2} ;

						
											console.log(oGbyV3) ;//oGbyV3.gby_lst
	
													//---------------------
								

										//===============================================
																				
										//div_tg
										
													$("#"+div_tg).html("");//span_hint
													
										//objCsv.Dates = {e_date1, e_date2, e_days2} ;
											$("#"+div_tg).append("<p>"+"Période : "+e_date1+" > "+e_date2+"</p>");//span_hint

													
										//const fld_i = "div_" + Makeid(8);
											const style = "text-align:left;margin-top:0.25rem;margin-bottom:0.25rem;padding:0.1rem;border:0px dotted orange;border-radius:12px;";

												div_tg2 = createDivFromObject({div_tgt:div_tg, style})

												div_tg3 = createDivFromObject({div_tgt:div_tg, style})


										//radioItems_lst = iso_code_lst.map(i_iso3 => [i_iso3, isoLocDic_r[i_iso3]]) ;
										var radioItems_lst = [["A", "JinterForce"], ["B", "StreamGraf"], ["D", "Lines"]] ;
										
											radioItems_lst = [["Lines", "Lines"], ["JinterForce", "JinterForce"], 
																["StreamGraf", "StreamGraf"], ["StreamPoints", "StreamPoints"], ] ;
										
										

												_setHtmlRadioClick2({
																div_tgt:div_tg2, radioItems_lst, 
																//RadioPostClick:RadioPostClick0
																//RadioPostClick: (res_params) => console.log("Sélection actuelle :", res_params)

																RadioPostClick: (res_params) => {
																						
																						_showReportD3v3(res_params)
																					}

															}) ;

												
											_showReportD3v3({value:"Lines"})				
								
								
								})();

						


			//**********************************************


	} ;





//=================================================================
//------------------
/*
output 
['ticker', 'name', 'Day', 'Close', 'Open', 'High', 'Low', 'Volume', 

	'v_delta', 'v_perc', 'Year', 'YearMonth', 'YearWeek', 'Month', 'nDay']

10:"2025"
11:"2025_08"
12:"2025_W34"
13:"08"


*/

		 
		function _enrichData_0(params) 
		{
			
			const objCsv = params ;

				var fld_pos   = objCsv.fld_pos, idx_close = fld_pos["Close"] ;
				var f_lst_new = [...objCsv.f_lst] ;
				
					if (!f_lst_new.includes("v_delta")) f_lst_new.push("v_delta") ;
					if (!f_lst_new.includes("v_perc"))  f_lst_new.push("v_perc") ;

				const idx_delta = f_lst_new.indexOf("v_delta"), idx_perc  = f_lst_new.indexOf("v_perc") ;
				const idx_date = f_lst_new.indexOf("Day")

				
					var csvLst_new = objCsv.csvLst.map((row, i) => {

						  const row_new = [...row] ;

						  if (i === 0) {
							row_new[idx_delta] = 0, row_new[idx_perc]  = 0 ;
							return row_new ;
						  }

						  const close_cur  = parseFloat(row[idx_close]), close_prev = parseFloat(objCsv.csvLst[i - 1][idx_close]) ;

						  const v_delta = roundToXDigits(close_cur - close_prev, 2) ;
						  const v_perc  = close_prev !== 0
										? roundToXDigits((100 * v_delta / close_prev), 2)
										: 0 ;

							  row_new[idx_delta] = v_delta, row_new[idx_perc]  = v_perc ;

							  return row_new ;

					}) ;


					var fld_pos_new = {} ;
					
						f_lst_new.forEach((fld, idx) => { fld_pos_new[fld] = idx ; }) ;

			  //---------------------------------------------------
			  //  #enrichDates  — PRIVÉE
			  //  Ajoute Year, YearMonth, YearWeek, Month, nDay, c1
			  //---------------------------------------------------
				//#enrichDates(objCsv, idx_date) {

					//const f_lst_new = [...objCsv.f_lst] ;

					const cols_add  = ["Year", "YearMonth", "YearWeek", "Month", "nDay"] ;


						if (idx_date)  {
							cols_add.forEach(c => { if (!f_lst_new.includes(c)) f_lst_new.push(c) ; }) ;
							
						} ;

							
						var csvLst_new2 = csvLst_new.map(row => {

							const row_new  = [...row], fld_date = row[idx_date] ;

								  if (!fld_date) return row_new ;

								  const d  = new Date(fld_date), y  = d.getFullYear() ;
								  const m  = String(d.getMonth() + 1).padStart(2, "0") ;

								  //---YearWeek
								  const d_jan1 = new Date(y, 0, 1) ;
								  const n_week = Math.ceil(((d - d_jan1) / 86400000 + d_jan1.getDay() + 1) / 7) ;
								  const yw = y + "_W" + String(n_week).padStart(2, "0") ;

								  const nDay = d.getDay() ;  // 0=dim … 6=sam

									  cols_add.forEach(c => {
										  
										const idx = f_lst_new.indexOf(c) ;
										if      (c === "Year")      row_new[idx] = String(y) ;
										else if (c === "YearMonth") row_new[idx] = y + "_" + m ;
										else if (c === "YearWeek")  row_new[idx] = yw ;
										else if (c === "Month")     row_new[idx] = m ;
										else if (c === "nDay")      row_new[idx] = nDay ;
										//else if (c === "c1") row_new[idx] = this.#ticker || "N/A" ;
										//else if (c === "c1") row_new[idx] = this.#ticker ;  // plus de || "N/A"

									  }) ;

								  return row_new ;

							}) ;

					fld_pos_new = {} ;
					
						f_lst_new.forEach((fld, idx) => { fld_pos_new[fld] = idx ; }) ;

				return { csvLst:csvLst_new2, f_lst:f_lst_new, fld_pos:fld_pos_new } ;

		
		}



