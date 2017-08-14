/**
 * Created by Pawan on 2/28/2017.
 */
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('./app.js');
var should = chai.should();
chai.use(chaiHttp);
var expect = chai.expect;
var assert=require('assert');

describe('/GET Applications', function()  {
    var AllApps;
    this.timeout(15000);


    before(function(done) {
        this.timeout(15000);
        chai.request(server).get('/DVP/API/1.0.0.0/APPRegistry/Applications').
            set('Authorization', 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdWtpdGhhIiwianRpIjoiYWEzOGRmZWYtNDFhOC00MWUyLTgwMzktOTJjZTY0YjM4ZDFmIiwic3ViIjoiNTZhOWU3NTlmYjA3MTkwN2EwMDAwMDAxMjVkOWU4MGI1YzdjNGY5ODQ2NmY5MjExNzk2ZWJmNDMiLCJleHAiOjE5MDIzODExMTgsInRlbmFudCI6LTEsImNvbXBhbnkiOi0xLCJzY29wZSI6W3sicmVzb3VyY2UiOiJhbGwiLCJhY3Rpb25zIjoiYWxsIn1dLCJpYXQiOjE0NzAzODExMTh9.Gmlu00Uj66Fzts-w6qEwNUz46XYGzE8wHUhAJOFtiRo')
            .set('content-type', 'application/json')
            .set('companyinfo','1:103')
            .end(function(err, res)  {

                res.body=JSON.parse(res.text);
                AllApps = {
                    err:err,
                    res:res.body
                };


                //console.log(Object.parse(res.text).Exception);


                done();


            });
    });

    it('No exceptions', function(done){

        AllApps.res.IsSuccess.should.be.eql(true);

        done();
    });

    it('Result should be an array', function(done){

        AllApps.res.Result.should.be.a('array');


        done();
    });

    it('Result should be an array of more than 0 elements', function(done){

        AllApps.res.Result.length.should.not.be.eql(0);
        done();

    });
    it('Every application should have an id', function(done){

        AllApps.res.Result.forEach(function (app) {
            app.should.have.property('id');
        });

        done();

    });
    it('Every application should have an property ff', function(done){

        AllApps.res.Result.forEach(function (app) {
            app.should.have.property('ff');
        });
        done();


    });
    /* it('Result should be an array', function(done){
     var info = JSON.stringify(AllApps.res.text);
     console.log(typeof(info));

     info.Result.should.be.a('array');
     done();
     });
     it('Result should be an array of 0 elements', function(done){
     var info = JSON.stringify(AllApps.res.text);
     console.log(typeof(info));
     info.length.should.be.eql(0);
     done();

     });*/
});

describe('/POST Application', function()  {
    var AllApps;
    this.timeout(15000);


    before(function(done) {
        this.timeout(15000);
        chai.request(server).post('/DVP/API/1.0.0.0/APPRegistry/Application').
            set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkdW9vd25lciIsImp0aSI6ImZjMTI4NDRkLTk5MTctNGQ3My1iOThjLTkzMmEwZTg3YzQ4ZCIsInN1YiI6IkFjY2VzcyBjbGllbnQiLCJleHAiOjE0ODg1MjA1NzcsInRlbmFudCI6MSwiY29tcGFueSI6MTAzLCJjb250ZXh0Ijp7InZlZXJ5YWNjb3VudCI6eyJ0eXBlIjoic2lwIiwidmVyaWZpZWQiOnRydWUsImRpc3BsYXkiOiI5NTcwIiwiY29udGFjdCI6InN1a2l0aGFAZHVvLm1lZGlhMS52ZWVyeS5jbG91ZCJ9fSwic2NvcGUiOlt7InJlc291cmNlIjoibXlOYXZpZ2F0aW9uIiwiYWN0aW9ucyI6WyJyZWFkIl19LHsicmVzb3VyY2UiOiJteVVzZXJQcm9maWxlIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6Im5vdGlmaWNhdGlvbiIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIl19LHsicmVzb3VyY2UiOiJzaXB1c2VyIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InN5c21vbml0b3JpbmciLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSJdfSx7InJlc291cmNlIjoiZGFzaGJvYXJkZXZlbnQiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiZGFzaGJvYXJkZ3JhcGgiLCJhY3Rpb25zIjpbInJlYWQiXX0seyJyZXNvdXJjZSI6InNvY2lhbCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJ0b2RvIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InJlbWluZCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJleHRlcm5hbFVzZXIiLCJhY3Rpb25zIjpbInJlYWQiXX0seyJyZXNvdXJjZSI6InVzZXJHcm91cCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJlbmdhZ2VtZW50IiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6ImluYm94IiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6ImZpbGVzZXJ2aWNlIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiXX0seyJyZXNvdXJjZSI6ImV2ZW50cyIsImFjdGlvbnMiOlsicmVhZCJdfSx7InJlc291cmNlIjoiaW50ZWdyYXRpb24iLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSJdfSx7InJlc291cmNlIjoidGlja2V0IiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiXX0seyJyZXNvdXJjZSI6InRhZyIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJ0aW1lciIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJ0aWNrZXR2aWV3IiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6ImZvcm1zIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InRpY2tldHR5cGVzIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InRpY2tldHN0YXR1c2Zsb3ciLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiRGlzcGF0Y2giLCJhY3Rpb25zIjpbIndyaXRlIl19LHsicmVzb3VyY2UiOiJjb250ZXh0IiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6ImVuZHVzZXIiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiYXBwcmVnIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiXX0seyJyZXNvdXJjZSI6ImNhbGxydWxlIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InRydW5rIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InF1ZXVlbXVzaWMiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoibGltaXQiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSJdfSx7InJlc291cmNlIjoiY2RyIiwiYWN0aW9ucyI6WyJyZWFkIl19LHsicmVzb3VyY2UiOiJleHRlbnNpb24iLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSJdfSx7InJlc291cmNlIjoiY29uZmVyZW5jZSIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJwYnhhZG1pbiIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJwYnh1c2VyIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InNjaGVkdWxlIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6Im51bWJlciIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJhcHBvaW50bWVudCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJjbHVzdGVyIiwiYWN0aW9ucyI6WyJyZWFkIl19LHsicmVzb3VyY2UiOiJ0ZW1wbGF0ZSIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJ0cmlnZ2VycyIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJzbGEiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiYXV0b2F0dGVuZGFuY2UiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoidHJ1bmtvcGVyYXRvciIsImFjdGlvbnMiOlsicmVhZCJdfSx7InJlc291cmNlIjoidm94Ym9uZSIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJxdWFsaXR5YXNzdXJhbmNlIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6ImF1ZGl0dHJhaWwiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSJdfSx7InJlc291cmNlIjoiY3NhdCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIl19LHsicmVzb3VyY2UiOiJjYW1wYWlnbiIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJicmVha3R5cGUiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiT3BlcmF0aW9ucyIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJjYW1wYWlnbmNvbmZpZ3VyYXRpb24iLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiY2FtcGFpZ25jYWxsYmFja3JlYXNvbiIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJjYW1wYWlnbm51bWJlcnMiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiQ2FtcGFpZ25TY2hlZHVsZSIsImFjdGlvbnMiOlsicmVhZCJdfSx7InJlc291cmNlIjoiY2FtcGFpZ25kbmMiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiY29udGFjdCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJkaWFsZXIiLCJhY3Rpb25zIjpbInJlYWQiXX0seyJyZXNvdXJjZSI6ImFyZHNyZXF1ZXN0IiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InJlcXVlc3RtZXRhIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InF1ZXVlIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InJlcXVlc3RzZXJ2ZXIiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiYXR0cmlidXRlIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6Imdyb3VwIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6ImFyZHNyZXNvdXJjZSIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJyZXNvdXJjZXRhc2thdHRyaWJ1dGUiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoidGFzayIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJwcm9kdWN0aXZpdHkiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiU2hhcmVkIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InRhc2tpbmZvIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InVzZXIiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoidXNlclByb2ZpbGUiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoib3JnYW5pc2F0aW9uIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiXX0seyJyZXNvdXJjZSI6InJlc291cmNlIiwiYWN0aW9ucyI6WyJyZWFkIl19LHsicmVzb3VyY2UiOiJwYWNrYWdlIiwiYWN0aW9ucyI6WyJyZWFkIl19LHsicmVzb3VyY2UiOiJjb25zb2xlIiwiYWN0aW9ucyI6WyJyZWFkIl19LHsicmVzb3VyY2UiOiJ1c2VyU2NvcGUiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoidXNlckFwcFNjb3BlIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InVzZXJNZXRhIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InVzZXJBcHBNZXRhIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6ImNsaWVudCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJjbGllbnRTY29wZSIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19XSwiaWF0IjoxNDg3OTE1Nzc3fQ.zq2-8vADl1zBU63x6wzgGAzsx09RFC9-h6yBWPArVmQ')
            .send({AppName:"teterAppTest1123",ObjType:"HTTAPI",IsDeveloper:"false",Description:"Tester",Url:"http://google.com",Availability:"true"})
            .end(function(err, res)  {



                res.body=JSON.parse(res.text);
                AllApps = {
                    err:err,
                    res:res.body
                };


                //console.log(Object.parse(res.text).Exception);

                done();


            });
    });

    it('Is Success', function(done){


        AllApps.res.IsSuccess.should.be.eql(true);
        done();

    });
    it('No Error response', function(done){

        should.equal(AllApps.res.Exception,null);
        done();

    });

    it('Should have a Result', function(done){

        assert.notEqual(AllApps.res.Result,null)
        done();

    });



    /* it('Result should not be null', function(done){

     console.log("---------------------------",AllApps.res.Result);
     expect(AllApps.res.Result).not.to.be.undefined;


     done();
     });

     it('Result should be an object', function(done){

     AllApps.res.Result.should.be.a('object');


     done();
     });

     it('New application should have an id', function(done){

     AllApps.res.Result.should.have.property('id');

     done();

     });*/



    /*it('New application should have an id', function(done){

     AllApps.res.Result.forEach(function (app) {
     app.should.have.property('ff');
     });
     done();


     });*/
    /* it('Result should be an array', function(done){
     var info = JSON.stringify(AllApps.res.text);
     console.log(typeof(info));

     info.Result.should.be.a('array');
     done();
     });
     it('Result should be an array of 0 elements', function(done){
     var info = JSON.stringify(AllApps.res.text);
     console.log(typeof(info));
     info.length.should.be.eql(0);
     done();

     });*/
});