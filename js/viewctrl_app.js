/*
 * App View and controller
 * 
 * Messages on status updates are posted to globally visible app model
 * this part contains the code to handle messaging 
 * 
 */

function AppView(parent, appModel) {

/*
 * Only updaters there so far
 * 
 */
	
	
appModel.addObserver(this);	
this.update = function(what) {

	if (what == "calendars loaded") {

		}
	
	
	if (what == "events added") {		
		appModel.setWorkingStatus("calculating occupancy...");
		calendarModel.totalBusyHours = calendarModel.updateTotalBusyHours(calendarModel.calendars,	appModel.selectedCldrs);
		yearViewUpdate();
		monthViewUpdate();
		}
	
	/*
	if (what == "updated") {
		for ( var k in appModel.cldrStatus) {
			if(appModel.getCldrStatus(k) == "checking...") return false;
			}
		
		appModel.setWorkingStatus("calculating occupancy...");
		calendarModel.totalBusyHours = calendarModel.updateTotalBusyHours(calendarModel.calendars,	appModel.selectedCldrs);

		yearViewUpdate();
		monthViewUpdate();
		}
	*/
	
	}//update
}



function AppCtrl(appModel, appView) {
	/*
	 * Initialization
	 * Startup work flow
	 *
	 */
	
	authentification = new Authentification(appModel);
	
	// while waiting API to load, initialize model and create the grid
	calendarModel = new CalendarModel(appModel);
	yearViewUpdate();
	legendView("#legendhere");

	
	appModel.addObserver(this);
	this.update = function(what) {

		if (what == "library loaded") {
			// the other necessary things are called by message, asynchronously
			listView = new ListView($("#listhere"), calendarModel);
			askGoogle = new AskGoogle(calendarModel);			
			askGoogle.loadCalendars();
			
			}	
		
	}//update
}
