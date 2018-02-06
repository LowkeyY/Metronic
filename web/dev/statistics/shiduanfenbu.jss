Ext.namespace("dev.statistics");

dev.statistics.shiduanfenbu = function(tabWidth) {
	var today = new Date();

	var ds = new Ext.data.JsonStore({
				method : 'GET',
				url : '/dev/statistics/shiduanfenbu.jcp',
				root : 'authArray',
				fields : ["shijian", "pv", "ip", "shijianjian"],
				remoteSort : true
			});
	ds.load({
				params : {
					'startdate' : today.add(Date.DAY, -7).format('Y/m/d'),
					'enddate' : today.format('Y/m/d')
				}
			});

	var toolbar = new Ext.Toolbar({
				width : "100%",
				items : [{
							xtype : 'tbspacer'
						}, {
							xtype : 'tbspacer'
						}, {
							xtype : 'tbspacer'
						}, {
							xtype : 'tbspacer'
						}, '开始时间:', {xtype: 'tbspacer'}, {
							xtype : 'datefield',
							id : 'startdate1',
							fieldLabel : '开始日期',
							name : 'startdate1',
							// The value matches the format; will be parsed and
							// displayed using that format.
							format : 'Y/m/d',
							emptyText : today.add(Date.DAY, -7),
							value : today.add(Date.DAY, -7)
						},{xtype: 'tbspacer'} ,'-', {xtype: 'tbspacer'}, '结束时间:', {xtype: 'tbspacer'}, {
							xtype : 'datefield',
							fieldLabel : '结束日期',
							id : 'enddate1',
							name : 'enddate1',
							// The value does not match the format, but does
							// match an altFormat; will be parsed
							// using the altFormat and displayed using the
							// format.
							format : 'Y/m/d',
							altFormats : 'm,d,Y|m.d.Y',
							emptyText : today,
							value : today
						},{xtype: 'tbspacer'},{xtype: 'tbspacer'}, new Ext.Button({
									text : '确定',
									id : 'qd',
									handler : function() {
										creattu1(ds)
									}
								})]
			});
	var height = (Ext.getBody().getHeight() - 83) * .55, chartOne = Ext.id(), chartTwo = Ext
			.id(), colWidth = tabWidth / ds.fields.length, panl = new Ext.Panel(
			{
				layout : 'border',
				tbar : toolbar,

				items : [{
							height : height,
							region : 'north',
							layout : 'hbox',
							border : false,
							layoutConfig : {
								align : 'stretch',
								pack : 'start'
							},
							items : [{
										id : chartOne,
										border : false,
										flex : 1
									}]
						}, {

							region : 'center',
							xtype : 'grid',
							store : ds,
							columnLines : true,
							closable : false,
							border : true,
							viewConfig : {
								forceFit : true
							},
							frame : false,
							columns : [{
										header : "时间",
										width : colWidth,
										dataIndex : "shijian",
										sortable : false
									}, {
										header : "PV",
										width : colWidth,
										dataIndex : "pv",
										sortable : false
									}, {
										header : "IP",
										width : colWidth,
										dataIndex : "ip",
										sortable : false
									}]
						}]
			})

	Ext.Ajax.request({
		url : '/dev/statistics/shiduanfenbu.jcp',
		params : {
			'startdate' : today.add(Date.DAY, -7).format('Y/m/d'),
			'enddate' : today.format('Y/m/d')
		},
		scope : this,
		method : 'Post',
		success : function(response, options) {

			var check = response.responseText;
			var ajaxResult = Ext.util.JSON.decode(check);
			var list = ajaxResult.authArray;

			var xml = '<anychart> 	<settings> 		<animation enabled="True"/> 	</settings> 	<charts> 		<chart plot_type="CategorizedVertical"> 			<data_plot_settings default_series_type="Bar"> 				<bar_series point_padding="0.2" group_padding="1"> 					<tooltip_settings enabled="true"/> 				</bar_series> 			</data_plot_settings> 			<chart_settings><title><text>时段分布</text></title><chart_background><fill enabled=\"true\" type=\"Solid\" color=\"#FFFFFF\" /><border enabled=\"False\" /><inside_margin all=\"8\" /></chart_background><data_plot_background><border enabled=\"False\" /><fill type=\"Solid\" color=\"#FFFFFF\" /></data_plot_background><axes><x_axis><zero_line enabled=\"False\" /><labels rotation=\"0\"><format>{%Value}{numDecimals:0,thousandsSeparator:}</format></labels><title><text>时间</text></title><scale /><major_grid><line color=\"#C0C0C0\" /></major_grid><minor_grid><line color=\"#C0C0C0\" opacity=\"0.5\" /></minor_grid></x_axis><y_axis name=\"yaxisf781daf5-52c0-437a-8918-8db01adc14f1-0\" position=\"Normal\"><zero_line enabled=\"False\" /><line color=\"#C0C0C0\" /><title><font color=\"#C0C0C0\" bold=\"True\" /><text>PV</text></title><labels><format>{%Value}{numDecimals:2,thousandsSeparator:}</format></labels><scale type=\"Linear\" minimum=\"0\" /><major_grid><line color=\"#C0C0C0\" /></major_grid><minor_grid><line color=\"#C0C0C0\" opacity=\"0.5\" /></minor_grid></y_axis></axes></chart_settings> 			<data> 								<series name="Series 1" color="#FFA042"> ';

			for (var i = 0; i < list.length; i++) {
				xml += "<point name=\"" + list[i].shijianjian + "\" y=\""
						+ list[i].pv + "\"/>"
			}

			xml += '</series> 							</data> 		</chart> 	</charts> </anychart>'

			//this.chartSample = new AnyChart('/lib/chart/AnyChart.swf');
			//this.chartSample.width = '100%';
			//this.chartSample.height = height;
			//this.chartSample.setData(xml);
			//this.chartSample.write(chartTwo);

			var xml2 = '<anychart> 	<settings> 		<animation enabled="True"/> 	</settings>   <charts>     <chart plot_type="CategorizedVertical">     	<chart_settings>     		<title>     			<text>时段分布</text>     			<background enabled="false"/>     		</title>     		<axes>     			<x_axis tickmarks_placement="Center">     				<labels display_mode="Stager"/>    <title><text>时间</text></title>  			</x_axis>     		</axes>     	</chart_settings>     	<data_plot_settings default_series_type="Spline">     		<line_series>     			<tooltip_settings enabled="true"> <format> 时间: {%Name} pv数量: {%YValue} </format>     			</tooltip_settings>     			<line_style>     				<line thickness="3"/> 	    		</line_style>     		</line_series>     	</data_plot_settings> 	    <data> 			<series name="Series 1"> 			 ';

			for (var i = 0; i < list.length; i++) {
				xml2 += "<point name=\"" + list[i].shijianjian + "\" y=\""
						+ list[i].pv + "\"/>"
			}
			xml2 += '			  			</series> 							    </data>     </chart>   </charts> </anychart> 						';

			this.chartSample = new AnyChart('/lib/chart/AnyChart.swf');
			this.chartSample.width = '100%';
			this.chartSample.height = height;
			this.chartSample.setData(xml2);
			this.chartSample.write(chartOne);

		}
	}, this);

	return panl;

	function creattu1(ds) {
		var today = new Date();
		var startdate1 = Ext.getCmp('startdate1').getRawValue();
		var enddate1 = Ext.getCmp('enddate1').getRawValue();
		ds.load({
					params : {
						'startdate' : startdate1,
						'enddate' : enddate1
					}
				});

		Ext.Ajax.request({
			url : '/dev/statistics/shiduanfenbu.jcp',
			params : {
				'startdate' : startdate1,
				'enddate' : enddate1
			},
			scope : this,
			method : 'Post',
			success : function(response, options) {

				var check = response.responseText;
				var ajaxResult = Ext.util.JSON.decode(check);
				var list = ajaxResult.authArray;

				var xml = '<anychart> 	<settings> 		<animation enabled="True"/> 	</settings> 	<charts> 		<chart plot_type="CategorizedVertical"> 			<data_plot_settings default_series_type="Bar"> 				<bar_series point_padding="0.2" group_padding="1"> 					<tooltip_settings enabled="true"/> 				</bar_series> 			</data_plot_settings> 			<chart_settings><title><text>时段分布</text></title><chart_background><fill enabled=\"true\" type=\"Solid\" color=\"#FFFFFF\" /><border enabled=\"False\" /><inside_margin all=\"8\" /></chart_background><data_plot_background><border enabled=\"False\" /><fill type=\"Solid\" color=\"#FFFFFF\" /></data_plot_background><axes><x_axis><zero_line enabled=\"False\" /><labels rotation=\"0\"><format>{%Value}{numDecimals:0,thousandsSeparator:}</format></labels><title><text>时间</text></title><scale /><major_grid><line color=\"#C0C0C0\" /></major_grid><minor_grid><line color=\"#C0C0C0\" opacity=\"0.5\" /></minor_grid></x_axis><y_axis name=\"yaxisf781daf5-52c0-437a-8918-8db01adc14f1-0\" position=\"Normal\"><zero_line enabled=\"False\" /><line color=\"#C0C0C0\" /><title><font color=\"#C0C0C0\" bold=\"True\" /><text>PV</text></title><labels><format>{%Value}{numDecimals:2,thousandsSeparator:}</format></labels><scale type=\"Linear\" minimum=\"0\" /><major_grid><line color=\"#C0C0C0\" /></major_grid><minor_grid><line color=\"#C0C0C0\" opacity=\"0.5\" /></minor_grid></y_axis></axes></chart_settings> 			<data> 								<series name="Series 1" color="#FFA042"> ';

				for (var i = 0; i < list.length; i++) {
					xml += "<point name=\"" + list[i].shijianjian + "\" y=\""
							+ list[i].pv + "\"/>"
				}

				xml += '</series> 							</data> 		</chart> 	</charts> </anychart>'

				//this.chartSample = new AnyChart('/lib/chart/AnyChart.swf');
				//this.chartSample.width = '100%';
				//this.chartSample.height = height;
				//this.chartSample.setData(xml);
				//this.chartSample.write(chartTwo);

				var xml2 = '<anychart> 	<settings> 		<animation enabled="True"/> 	</settings>   <charts>     <chart plot_type="CategorizedVertical">     	<chart_settings>     		<title>     			<text>时段分布</text>     			<background enabled="false"/>     		</title>     		<axes>     			<x_axis tickmarks_placement="Center">     				<labels display_mode="Stager"/>    <title><text>时间</text></title>  			</x_axis>     		</axes>     	</chart_settings>     	<data_plot_settings default_series_type="Spline">     		<line_series>     			<tooltip_settings enabled="true"> <format> 时间: {%Name} pv数量: {%YValue} </format>     			</tooltip_settings>     			<line_style>     				<line thickness="3"/> 	    		</line_style>     		</line_series>     	</data_plot_settings> 	    <data> 			<series name="Series 1"> 			 ';

				for (var i = 0; i < list.length; i++) {
					xml2 += "<point name=\"" + list[i].shijianjian + "\" y=\""
							+ list[i].pv + "\"/>"
				}
				xml2 += '			  			</series> 							    </data>     </chart>   </charts> </anychart> 						';

				this.chartSample = new AnyChart('/lib/chart/AnyChart.swf');
				this.chartSample.width = '100%';
				this.chartSample.height = height;
				this.chartSample.setData(xml2);
				this.chartSample.write(chartOne);
			}
		}, this);
	}

}
