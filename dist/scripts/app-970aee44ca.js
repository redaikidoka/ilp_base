!function(){"use strict";angular.module("ilpBase",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngResource","ui.router","ui.bootstrap"])}(),function(){"use strict";function e(){function e(){return s}var s=[{title:"AngularJS",url:"https://angularjs.org/",description:"HTML enhanced for web apps!",logo:"angular.png"},{title:"BrowserSync",url:"http://browsersync.io/",description:"Time-saving synchronised browser testing.",logo:"browsersync.png"},{title:"GulpJS",url:"http://gulpjs.com/",description:"The streaming build system.",logo:"gulp.png"},{title:"Jasmine",url:"http://jasmine.github.io/",description:"Behavior-Driven JavaScript.",logo:"jasmine.png"},{title:"Karma",url:"http://karma-runner.github.io/",description:"Spectacular Test Runner for JavaScript.",logo:"karma.png"},{title:"Protractor",url:"https://github.com/angular/protractor",description:"End to end test framework for AngularJS applications built on top of WebDriverJS.",logo:"protractor.png"},{title:"Bootstrap",url:"http://getbootstrap.com/",description:"Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.",logo:"bootstrap.png"},{title:"Angular UI Bootstrap",url:"http://angular-ui.github.io/bootstrap/",description:"Bootstrap components written in pure AngularJS by the AngularUI Team.",logo:"ui-bootstrap.png"},{title:"Sass (Node)",url:"https://github.com/sass/node-sass",description:"Node.js binding to libsass, the C version of the popular stylesheet preprocessor, Sass.",logo:"node-sass.png"},{key:"jade",title:"Jade",url:"http://jade-lang.com/",description:"Jade is a high performance template engine heavily influenced by Haml and implemented with JavaScript for node.",logo:"jade.png"}];this.getTec=e}angular.module("ilpBase").service("webDevTec",e)}(),function(){"use strict";function e(){function e(e){var s=e;s.log(this.user),this.user?s.log("Acme Navbar for ",this.user," on "+this.activetab):s.log("Acme Navbar: no user")}var s={restrict:"E",templateUrl:"app/components/navbar/navbar.html",scope:{user:"=",activetab:"="},controller:e,controllerAs:"vm",bindToController:!0};return e.$inject=["$log"],s}angular.module("ilpBase").directive("acmeNavbar",e)}(),function(){"use strict";function e(){function e(e,s){var t=e;s.user?(this.user=s.user,t.log("We have user in ilpNav")):this.user={name:"Severus Snape",username:"snape",password:"debug",thumbnail:"assets/images/snape.jpg",validated:!1,loggedin:!0}}var s={restrict:"E",templateUrl:"app/components/ilpNav/ilpNav.html",scope:{user:"=",activetab:"="},controller:e,controllerAs:"vm",bindToController:!0};return e.$inject=["$log","$rootScope"],s}angular.module("ilpBase").directive("ilpNav",e)}(),function(){"use strict";function e(){function e(e,s){e.getHeaderColor=function(e){return e.contents?"":"hilite"}}var s={restrict:"E",templateUrl:"app/components/ilpField/ilpField.html",scope:{datafield:"="},controller:e,controllerAs:"vm",bindToController:!0};return e.$inject=["$scope","$log"],s}angular.module("ilpBase").directive("ilpField",e)}(),function(){"use strict";function e(e,s){function t(t){function i(e){return e.data}function n(s){e.error("XHR Failed for getContributors.\n"+angular.toJson(s.data,!0))}return t||(t=30),s.get(a+"/contributors?per_page="+t).then(i)["catch"](n)}var a="https://api.github.com/repos/Swiip/generator-gulp-angular",i={apiHost:a,getContributors:t};return i}angular.module("ilpBase").factory("githubContributor",e),e.$inject=["$log","$http"]}(),function(){"use strict";function e(e){function s(){return l}function t(e){var t=s();console.log("getclass("+e+")"," classes:",t);for(var a={},i=0;i<t.length;i++)if(t[i].idClass==e){a=t[i],console.log("found: ",a);break}return console.log("getClass found:",a),a}function a(e){return 1===parseInt(e)?o:r}function i(){return n}var n="2015/2016",l=[{idClass:1,name:"Potions K",description:"A really great introduction to blowing things up",schoolyearId:1,grade:0},{idClass:2,name:"Charms",description:"How to make cool things happen",schoolyearId:1,grade:1}],o=[{absences:0,age:4,cohort:"Ravenclaw",dob:"2010-11-13T00:00:00.000Z",grade:0,hasIlp:null,idClass:2,idClassstudentLink:16,idSchoolyear:1,idStudent:16,name:"Trevor Boot",nameFirst:"Trevor",nameLast:"Boot",profilepicture:"16_b.png",studentid:"29135540"},{absences:0,age:5,cohort:"Slytherin",dob:"2010-04-02T00:00:00.000Z",grade:0,hasIlp:!0,idClass:2,idClassstudentLink:17,idSchoolyear:1,idStudent:17,name:"Millicent Bulstrode",nameFirst:"Millicent",nameLast:"Bulstrode",profilepicture:"17_b.png",studentid:"31703501"},{absences:0,age:5,cohort:"Gryffindor",dob:"2010-08-31T00:00:00.000Z",grade:0,hasIlp:null,idClass:2,idClassstudentLink:18,idSchoolyear:1,idStudent:18,name:"Neville Longbottom",nameFirst:"Neville",nameLast:"Longbottom",profilepicture:"18_b.png",studentid:"31716357"},{absences:0,age:4,cohort:"Ravenclaw",dob:"2010-11-19T00:00:00.000Z",grade:0,hasIlp:null,idClass:2,idClassstudentLink:19,idSchoolyear:1,idStudent:19,name:"Tracey Davis",nameFirst:"Tracey",nameLast:"Davis",profilepicture:"19_b.png",studentid:"33593925"},{absences:0,age:4,cohort:"Ravenclaw",dob:"2010-09-23T00:00:00.000Z",grade:0,hasIlp:null,idClass:2,idClassstudentLink:20,idSchoolyear:1,idStudent:20,name:"Luna Lovegood",nameFirst:"Luna",nameLast:"Lovegood",profilepicture:"20_b.png",studentid:"34105657"},{absences:0,age:5,cohort:"Ravenclaw",dob:"2010-08-18T00:00:00.000Z",grade:0,hasIlp:null,idClass:1,idClassstudentLink:50,idSchoolyear:1,idStudent:34,name:"Michael Corner",nameFirst:"Michael",nameLast:"Corner",profilepicture:"34_b.png",studentid:"70554723"},{absences:0,age:4,cohort:"Gryffindor",dob:"2010-11-18T00:00:00.000Z",grade:0,hasIlp:null,idClass:1,idClassstudentLink:51,idSchoolyear:1,idStudent:35,name:"Ronald Weasley",nameFirst:"Ronald",nameLast:"Weasley",profilepicture:"35_b.png",studentid:"80929783"},{absences:0,age:4,cohort:"Hufflepuff",dob:"2010-10-31T00:00:00.000Z",grade:0,hasIlp:null,idClass:1,idClassstudentLink:52,idSchoolyear:1,idStudent:36,name:"Susan Bones",nameFirst:"Susan",nameLast:"Bones",profilepicture:"36_b.png",studentid:"83169891"},{absences:0,age:5,cohort:"Hufflepuff",dob:"2010-07-23T00:00:00.000Z",grade:0,hasIlp:null,idClass:1,idClassstudentLink:53,idSchoolyear:1,idStudent:37,name:"Isobel MacDougal",nameFirst:"Isobel",nameLast:"MacDougal",profilepicture:"37_b.png",studentid:"84471424"},{absences:0,age:4,cohort:"Gryffindor",dob:"2010-10-31T00:00:00.000Z",grade:0,hasIlp:null,idClass:1,idClassstudentLink:54,idSchoolyear:1,idStudent:38,name:"Mati Patel",nameFirst:"Mati",nameLast:"Patel",profilepicture:"38_b.png",studentid:"94025816"},{absences:0,age:4,cohort:"Hufflepuff",dob:"2010-10-17T00:00:00.000Z",grade:0,hasIlp:null,idClass:1,idClassstudentLink:55,idSchoolyear:1,idStudent:39,name:"Ernest Macmillan",nameFirst:"Ernest",nameLast:"Macmillan",profilepicture:"39_b.png",studentid:"98185277"}],r=[{absences:0,age:5,cohort:"Slytherin",dob:"2010-04-22T00:00:00.000Z",grade:0,hasIlp:null,idClass:2,idClassstudentLink:15,idSchoolyear:1,idStudent:15,name:"Theodore Nott",nameFirst:"Theodore",nameLast:"Nott",profilepicture:"15_b.png",studentid:"21963795"},{absences:0,age:4,cohort:"Ravenclaw",dob:"2010-11-13T00:00:00.000Z",grade:0,hasIlp:null,idClass:2,idClassstudentLink:16,idSchoolyear:1,idStudent:16,name:"Trevor Boot",nameFirst:"Trevor",nameLast:"Boot",profilepicture:"16_b.png",studentid:"29135540"},{absences:0,age:5,cohort:"Slytherin",dob:"2010-04-02T00:00:00.000Z",grade:0,hasIlp:!0,idClass:2,idClassstudentLink:17,idSchoolyear:1,idStudent:17,name:"Millicent Bulstrode",nameFirst:"Millicent",nameLast:"Bulstrode",profilepicture:"17_b.png",studentid:"31703501"}];this.getClassList=s,this.getClass=t,this.getStudentList=a,this.getSchoolYear=i}angular.module("ilpBase").service("dtaClass",e),e.$inject=["$filter"]}(),function(){"use strict";function e(){var e=this;e.user=""}angular.module("ilpBase").controller("SandboxController",e)}(),function(){"use strict";function e(e,s,t){function a(){n(),e(function(){l.classAnimation="rubberBand"},4e3)}function i(){t.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>'),l.classAnimation=""}function n(){l.awesomeThings=s.getTec(),angular.forEach(l.awesomeThings,function(e){e.rank=Math.random()})}var l=this;l.awesomeThings=[],l.classAnimation="",l.creationDate=1440528250245,l.showToastr=i,a()}angular.module("ilpBase").controller("MainController",e),e.$inject=["$timeout","webDevTec","toastr"]}(),function(){"use strict";function e(e,s){var t=this;t.lastUpdated=new Date,e.getHeaderColor=function(e){return e.contents?"":"hilite"},t.plan={idIlp:1,idSchoolyear:1,idStudent:17,sUpdate:"2015-09-01T10:56:04.000Z",sCreate:null,pages:[]},t.user={idTeacher:13,name:"Filius Flitwick",nameFirst:"Filius ",nameLast:"Flitwick",teacherId:"145860408",cohort:"",profilePicture:"assets/images/flitwick.jpeg"},t.student={absences:0,age:5,cohort:"Gryffindor",dob:"2010-07-01T00:00:00.000Z",grade:0,hasIlp:null,idClass:2,idClassstudentLink:23,idSchoolyear:1,idStudent:23,name:"Harry Potter",nameFirst:"Harry",nameLast:"Potter",profilepicture:"23_b.png",fullpicture:"hp1.jpg",studentid:"44117232"},t.plan.pages=[{idSectionDef:1,name:"Summary",description:"Used for Intakes and Updates",title:"Summary",order:10,idSectionType:null,sectionType:"F"},{idSectionDef:2,name:"Arc 1",description:null,title:"Arc 1",order:20,idSectionType:null,sectionType:"A"},{idSectionDef:3,name:"Arc 2",description:null,title:"Arc 2",order:30,idSectionType:null,sectionType:"A"},{idSectionDef:4,name:"Arc 3",description:null,title:"Arc 3",order:40,idSectionType:null,sectionType:"A"},{idSectionDef:5,name:"SEL",description:null,title:"SEL",order:50,idSectionType:null,sectionType:"F"},{idSectionDef:6,name:"Art",description:null,title:"Art",order:60,idSectionType:null,sectionType:"F"},{idSectionDef:7,name:"Spanish",description:null,title:"Spanish",order:70,idSectionType:null,sectionType:"?"},{idSectionDef:8,name:"Feed",description:null,title:"Feed",order:80,idSectionType:null,sectionType:"D"}],t.plan.pages[0].layoutColumns=[10,20],t.plan.pages[0].fields=[{sectionName:"Summary",sectionDescription:"Used for Intakes and Updates",sectionTitle:"Summary",idSectionDef:1,idFieldDef:1,name:"Meeting Notes",description:"Notes for each get-together",fieldType:"T",slug:"meeting",layoutColumn:10,displayOrder:22,updatesFeed:1,feedsTo:null,isRequired:0,contents:"In Meeting: Petunia Dursley, Harry Potter, Severus Snape, Albus Dumbledore.",sCreate:"2015-09-17T11:06:19.000Z",sUpdate:null,sIdUser:-1,idIlp:7,idStudent:17,idField:46},{sectionName:"Summary",sectionDescription:"Used for Intakes and Updates",sectionTitle:"Summary",idSectionDef:1,idFieldDef:2,name:"Likes",description:"What the student likes",fieldType:"L",slug:"likes",layoutColumn:10,displayOrder:5,updatesFeed:1,feedsTo:null,isRequired:0,contents:"Quidditch",sCreate:"2015-09-17T11:06:19.000Z",sUpdate:null,sIdUser:-1,idIlp:7,idStudent:17,idField:47},{sectionName:"Summary",sectionDescription:"Used for Intakes and Updates",sectionTitle:"Summary",idSectionDef:1,idFieldDef:3,name:"Dislikes",description:"What the student preferes not to have",fieldType:"L",slug:"dislikes",layoutColumn:10,displayOrder:10,updatesFeed:1,feedsTo:null,isRequired:0,contents:null,sCreate:"2015-09-17T11:06:19.000Z",sUpdate:null,sIdUser:-1,idIlp:7,idStudent:17,idField:48},{sectionName:"Summary",sectionDescription:"Used for Intakes and Updates",sectionTitle:"Summary",idSectionDef:1,idFieldDef:4,name:"Family",description:"Notes on the students family",fieldType:"T",slug:"family",layoutColumn:20,displayOrder:29,updatesFeed:1,feedsTo:null,isRequired:0,contents:"Parents deceased. Guardian ad Litem is Petunia Dursley.\nCurrently living under the stairs at the Dursley residence.",sCreate:"2015-09-17T11:06:19.000Z",sUpdate:null,sIdUser:-1,idIlp:7,idStudent:17,idField:49},{sectionName:"Summary",sectionDescription:"Used for Intakes and Updates",sectionTitle:"Summary",idSectionDef:1,idFieldDef:5,name:"Extra-Curricular",description:"Favorite Extra-Curricular activities",fieldType:"L",slug:"ec",layoutColumn:10,displayOrder:20,updatesFeed:1,feedsTo:null,isRequired:0,contents:null,sCreate:"2015-09-17T11:06:19.000Z",sUpdate:null,sIdUser:-1,idIlp:7,idStudent:17,idField:50},{sectionName:"Summary",sectionDescription:"Used for Intakes and Updates",sectionTitle:"Summary",idSectionDef:1,idFieldDef:6,name:"Social/Emotional Notes",description:"How the student interacts",fieldType:"T",slug:"learning",layoutColumn:20,displayOrder:25,updatesFeed:1,feedsTo:null,isRequired:0,contents:null,sCreate:"2015-09-17T11:06:19.000Z",sUpdate:null,sIdUser:-1,idIlp:7,idStudent:17,idField:51},{sectionName:"Summary",sectionDescription:"Used for Intakes and Updates",sectionTitle:"Summary",idSectionDef:1,idFieldDef:7,name:"Peer Group",description:"Notes on friends/etc.",fieldType:"T",slug:"peers",layoutColumn:20,displayOrder:30,updatesFeed:1,feedsTo:null,isRequired:0,contents:"No friends at home. Bullied by Dudley. Strong friend group at school.",sCreate:"2015-09-17T11:06:19.000Z",sUpdate:null,sIdUser:-1,idIlp:7,idStudent:17,idField:52},{sectionName:"Summary",sectionDescription:"Used for Intakes and Updates",sectionTitle:"Summary",idSectionDef:1,idFieldDef:8,name:"Health",description:"Any health concerns or regular things to watch for",fieldType:"T",slug:"health",layoutColumn:20,displayOrder:35,updatesFeed:1,feedsTo:null,isRequired:0,contents:null,sCreate:"2015-09-17T11:06:19.000Z",sUpdate:null,sIdUser:-1,idIlp:7,idStudent:17,idField:53},{sectionName:"Summary",sectionDescription:"Used for Intakes and Updates",sectionTitle:"Summary",idSectionDef:1,idFieldDef:9,name:"Academic Notes",description:"How the student Learns",fieldType:"",slug:"academic",layoutColumn:20,displayOrder:27,updatesFeed:1,feedsTo:null,isRequired:0,contents:null,sCreate:"2015-09-17T11:06:19.000Z",sUpdate:null,sIdUser:-1,idIlp:7,idStudent:17,idField:54}]}angular.module("ilpBase").controller("IlpController",e),e.$inject=["$scope","$log"]}(),function(){"use strict";angular.module("ilpBase").filter("fromNow",["moment",function(e){return function(s){return e(s).fromNow()}}])}(),function(){"use strict";function e(e,s,t){var a=this,i={};e.user={};var n="Filius Flitwik",l="assets/images/flitwick.jpeg";a.userPic="",e.login=function(e){console.log("Clicked login with:",e),"filius"===e.name&&(i.name=n,i.username=e.name,i.password=e.password,i.thumbnail=l,i.validated=!0,i.loggedin=!0,t.user=i,s.path("/classes"))}}angular.module("ilpBase").controller("HomeController",e),e.$inject=["$scope","$location","$rootScope"]}(),function(){"use strict";function e(){var e=this;e.user=""}angular.module("ilpBase").controller("FeedController",e)}(),function(){"use strict";function e(e,s,t,a){var i=this;i.currentClassId=t.classId,i.currentClass=a.getClass(i.currentClassId),i.studentList=a.getStudentList(i.currentClassId),console.log("a class id:",i.currentClassId,"class",i.currentClass,"studnets",i.studentList)}angular.module("ilpBase").controller("ClassListController",e),e.$inject=["$scope","$state","$stateParams","dtaClass"]}(),function(){"use strict";function e(e){var s=this;s.currentSchoolYear="2015/2016",s.currentClassId=2,s.classList=e.getClassList(),s.currentClass=s.classList[1]}angular.module("ilpBase").controller("ClassesController",e),e.$inject=["dtaClass"]}(),function(){"use strict";function e(e){e.debug("runBlock end")}angular.module("ilpBase").run(e),e.$inject=["$log"]}(),function(){"use strict";function e(e,s){e.state("home",{url:"/",templateUrl:"app/home/home.html",controller:"HomeController",controllerAs:"home"}).state("login",{url:"/login",templateUrl:"app/home/home.html",controller:"LoginController",controllerAs:"login"}).state("myclasses",{url:"/myclasses",templateUrl:"app/classes/classes.html",controller:"ClassesController",controllerAs:"myclasses"}).state("myclasses.class",{url:"/class/{classId}",templateUrl:"app/classes/classlist.html",controller:"ClassListController",controllerAs:"aclass"}).state("ilp",{url:"/ilp",templateUrl:"app/ilp/ilp.html",controller:"IlpController",controllerAs:"ilp"}).state("sandbox",{url:"/sandbox",templateUrl:"app/sandbox/sandbox.html",controller:"SandboxController",controllerAs:"sandbox"}).state("feed",{url:"/feed",templateUrl:"app/feed/feed.html",controller:"FeedController",controllerAs:"feed"}),s.otherwise("/")}angular.module("ilpBase").config(e),e.$inject=["$stateProvider","$urlRouterProvider"]}(),function(){"use strict";angular.module("ilpBase").constant("moment",moment)}(),function(){"use strict";function e(e,s){e.debugEnabled(!0),s.degugging=!0}angular.module("ilpBase").config(e),e.$inject=["$logProvider","$rootScopeProvider"]}(),angular.module("ilpBase").run(["$templateCache",function(e){e.put("app/classes/classes.html",'<ilp-nav activetab="\'classes\'"></ilp-nav><div class="container-fluid"><div></div><h3 class="p-t p-l">Classes for {{myclasses.currentSchoolYear}}</h3></div><div class="m-t-md"><nav class="navbar subnav"><ul class="nav nav-pills"><li ng-repeat="c in myclasses.classList" ui-sref-active="active" class="nav-item"><a ui-sref="myclasses.class({classId: c.idClass})" class="nav-link">{{c.name}}</a></li></ul></nav></div><div ui-view=""></div>'),e.put("app/classes/classlist.html",'<div class="container"><h4>Grade: {{aclass.currentClass.grade}}</h4><form><fieldset class="form-group"><label for="course-description">{{aclass.currentClass.name}} Course Overview</label> <textarea id="course-description" rows="4" placeholder="enter the description of your course" ng-bind="aclass.currentClass.description" class="form-control"></textarea></fieldset><button class="btn btn-primary pull-right">Save</button></form></div><div class="container m-t-md"><div class="card"><div class="card-header"><h4><button type="button" ng-click="isCollapsedS = !isCollapsedS" class="btn btn-default"><i ng-show="!isCollapsedS" class="icon ion-arrow-down-b"></i><i ng-show="isCollapsedS" class="icon ion-arrow-right-b"></i></button><span>&nbsp;&nbsp; Students</span></h4><button ui-href="#" class="btn pull-right">Add Student</button></div><div id="collapseStudents" collapse="isCollapsedS" class="card-block collapse in"><ul class="list-unstyled student-list"><li ng-repeat="student in aclass.studentList" class="p-b"><img ng-src="assets/images/students/{{student.profilepicture}}" class="m-r"><span>{{student.name}}</span><a ng-show="student.hasIlp" ng-href="#/ilp">View ILP</a> <button ng-show="!student.hasIlp" ng-class="{\'btn-danger\' : !student.hasIlp}" ng-href="#/ILP/{{student.idStudent}}" class="btn spacious">Initial Intake</button></li></ul><br></div></div><div class="card"><div class="card-header"><h4><button type="button" ng-click="isOpenG = !isOpenG" class="btn btn-default"><i ng-show="isOpenG" class="icon ion-arrow-down-b"></i><i ng-show="!isOpenG" class="icon ion-arrow-right-b"></i></button><span>&nbsp;&nbsp;Goals</span></h4></div><div id="collapseGoals" collapse="!isOpenG" class="card-block collapse"><p>Goals coming in v2</p></div></div></div>'),e.put("app/home/home.html",'<ilp-navbar user="home.localUser" activetab="\'home\'" ng-show="$scope.localUser.loggedin"></ilp-navbar><div id="login" class="container-fluid"><div class="m-t jumbotron text-center"><h1>NSSF Individual Learning Plans</h1><p>&nbsp;</p><form><div class="input-group"><input type="text" placeholder="User Name" aria-describedby="emailaddon" ng-model="user.name" class="form-control"><span id="emailaddon" class="input-group-addon">@nssf.org</span></div><br><div class="input-group text-center"><input type="password" placeholder="password" ng-model="user.password" class="form-control"></div><input type="submit" ng-click="login(user)" class="m-t"></form></div></div>'),e.put("app/feed/feed.html",'<ilp-navbar activetab="\'feed\'"></ilp-navbar><div class="container-fluid"><h2 class="m-b text-center">Sample Feed - Coming Soon</h2><img src="assets/images/feed-content.jpg"></div>'),e.put("app/feed/sandbox.html",'<acme-navbar activetab="\'feed\'"></acme-navbar><div class="container-fluid"><img src="assets/images/feed-content.jpg"></div>'),e.put("app/ilp/ilp.html",'<ilp-nav activetab="\'ilp\'"></ilp-nav><div class="container-fluid"><label class="update pull-right">Last Updated <span am-time-ago="ilp.lastUpdated">{{ilp.lastUpdated | fromNow}} ...</span></label><img ng-src="assets/images/students/{{ilp.student.fullpicture}}" class="m-t-md profile-pic pull-left"><h2 class="m-t-md">{{ilp.student.name}}</h2><label>House: <em>{{ilp.student.cohort}}</em></label> <label class="m-l">Age: <em>{{ilp.student.age}}</em><span class="m-l">Grade:</span><em>K</em></label></div><div class="m-t-md"><nav class="navbar subnav"><ul class="nav nav-pills"><li ng-repeat="pg in ilp.plan.pages" ng-class="{\'active\': pg.idSectionDef == 1 }" class="nav-item"><a ng-class="{\'selected\' : pg.idSectionDef == 1}">{{pg.title}} <i ng-show="pg.idSectionDef==1 || pg.idSectionDef == 5" class="icon ion-alert">&nbsp;</i></a></li></ul></nav></div><div><img src="assets/images/goals.png" class="pull-right"> <button type="button" class="btn btn-save m-t m-l">Save</button><div id="ilp-summary" class="clearfix container-fluid m-t"><div class="col-md-4 col-sm-12"><ilp-field ng-repeat="fld in ilp.plan.pages[0].fields | filter:{ layoutColumn: 10}" datafield="fld"></ilp-field></div><div class="col-md-8 col-sm-12"><ilp-field ng-repeat="fld in ilp.plan.pages[0].fields | filter:{ layoutColumn: 20}" datafield="fld"></ilp-field></div></div><button type="button" class="btn btn-save m-t m-l pull-right">Save</button><br></div>'),e.put("app/main/main.html",'<div class="container"><div><acme-navbar creationdate="main.creationDate"></acme-navbar></div><div class="jumbotron text-center"><h1>NSSF ILP</h1><p class="lead"><i>love to scaffold. I live for it.</i></p><p><button type="button" ng-click="main.showToastr()" class="btn btn-lg btn-success">Splendid Toast</button></p></div><div class="row"><div ng-repeat="coolThing in main.awesomeThings | orderBy:\'rank\'" class="col-sm-6 col-md-4"><div class="thumbnail"><img ng-src="assets/images/{{ coolThing.logo }}" class="pull-right"><div class="caption"><h3>{{ coolThing.title}}</h3><p>{{ coolThing.description }}</p><p><a ng-href="{{coolThing.url}}">{{coolThing.url}}</a></p></div></div></div></div></div>'),e.put("app/sandbox/sandbox.html",'<ilp-navbar activetab="\'sandbox\'"></ilp-navbar><div class="container-fluid"><div class="jumbotron m-t"><h1 class="display-3">Coming Soon: Sandbox</h1><p class="lead">A portal for teachers to quickly enter portfolio pieces for their students and classes</p></div></div>'),e.put("app/components/ilpField/ilpField.html",'<div class="card"><div ng-class="getHeaderColor(vm.datafield)" class="card-header"><img src="assets/icons/i_pin.png" class="icon pin"><img src="assets/icons/i_question.png" class="icon prompts"><h4>{{vm.datafield.name}}</h4></div><div class="card-block"><textarea rows="8" placeholder="{{vm.datafield.description}}">{{vm.datafield.contents}}</textarea><img src="assets/icons/i_....png" class="icon history"> <label ng-show="vm.datafield.sUpdate" class="updatenote">Last Updated {{vm.datafield.sUpdate | fromNow}}</label></div></div>'),e.put("app/components/ilpNav/ilpnav.html",'<nav class="navbar navbar-dark bg-inverse"><div class="container-fluid"><div class="navbar-header"><a ng-href="#/" class="navbar-brand"><img id="logo" alt="brand" src="assets/images/nsf_logo_color.png"></a> <button type="button" data-toggle="collapse" data-target="#mainmenu" aria-expanded="false" class="navbar-toggle collapsed"></button><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></div><div><ul class="nav navbar-nav"><li ng-class="{\'active\' : vm.activetab == \'classes\'}" class="nav-item"><a ng-href="#/classes" class="selected">My Classes</a></li><li ng-class="{ \'active\' : vm.activetab == \'ilp\'}" class="nav-item"><a ng-href="#/ilp">ILP</a></li><li ng-class="{ \'active\' : vm.activetab == \'feed\'}" class="nav-item disabled"><a ng-href="#/feed">Feed</a></li><li ng-class="{ \'active\' : vm.activetab == \'sandbox\'}" class="nav-item disabled"><a ng-href="#/sandbox">Sandbox</a></li></ul><ul id="loggedin" ng-show="vm.user.loggedin" class="nav navbar-nav pull-right"><li class="nav-item user"><img ng-src="{{vm.user.thumbnail}}"><a ng-href="#" style="display:inline; padding-left:0.2rem !important;" class="username">&nbsp; {{ vm.user.name }}</a></li></ul></div></div></nav>'),e.put("app/components/navbar/navbar.html",'<nav class="navbar navbar-static-top navbar-dark bg-inverse"><div class="container-fluid"><div class="navbar-header"><a ng-href="#/" class="navbar-brand"><img src="assets/images/nsf_logo_color.png"></a></div><div id="bs-example-navbar-collapse-6" class="collapse navbar-toggleable-sm"><ul id="mainmenu" class="nav navbar-nav"><li ng-class="{\'active\' : vm.activetab == \'classes\'}" class="nav-item"><a ui-href="myclasses" class="selected">My Classes</a></li><li ng-class="{ \'active\' : vm.activetab == \'ilp\'}" class="nav-item"><a ui-href="ilp">ILP</a></li><li ng-class="{ \'active\' : vm.activetab == \'feed\'}" class="nav-item disabled"><a ui-href="feed">Feed</a></li><li ng-class="{ \'active\' : vm.activetab == \'sandbox\'}" class="nav-item disabled"><a ui-href="sandbox">Sandbox</a></li></ul><ul id="loggedin" ng-show="vm.user.loggedin" class="nav navbar-nav pull-right acme-navbar-text"><li class="nav-item user"><img src="{{vm.user.userpic}}"><a ng-href="#">&nbsp; {{ vm.user.name }}</a></li></ul></div></div></nav>')}]);