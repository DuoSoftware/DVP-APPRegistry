/**
 * Created by pawan on 4/8/2015.
 */
var restify = require('restify');
var Developer = require('./AppDeveloperManagement.js');
var APP = require('./VoiceAppManagement.js');
var http = require('http');
var cors = require('cors');
var config = require('config');
var logger = require('dvp-common/LogHandler/CommonLogHandler.js').logger;
var uuid=require('node-uuid');
var port = config.Host.port || 3000;
var version=config.Host.version;
var messageFormatter = require('dvp-common/CommonMessageGenerator/ClientMessageJsonFormatter.js');
var jwt = require('restify-jwt');
var secret = require('dvp-common/Authentication/Secret.js');
var authorization = require('dvp-common/Authentication/Authorization.js');

var RestServer = restify.createServer({
    name: "myapp",
    version: '1.0.0'
});

restify.CORS.ALLOW_HEADERS.push('authorization');
//restify.CORS.ALLOW_HEADERS.push('Access-Control-Request-Method');


RestServer.pre(restify.pre.userAgentConnection());
RestServer.use(restify.CORS());
RestServer.use(restify.fullResponse());
RestServer.use(jwt({secret: secret.Secret}));

restify.CORS.ALLOW_HEADERS.push('authorization');
//Server listen

RestServer.listen(port, function () {
    console.log('%s listening at %s', RestServer.name, RestServer.url);

});

//Enable request body parsing(access)
RestServer.use(restify.bodyParser());
RestServer.use(restify.acceptParser(RestServer.acceptable));
RestServer.use(restify.queryParser());


RestServer.post('/DVP/API/'+version+'/APPRegistry/Developer',authorization({resource:"appreg", action:"write"}),function(req,res,next) {

    var reqId='';


    try {

        try
        {
            reqId = uuid.v1();
        }
        catch(ex)
        {

        }


        if(!req.user.company || !req.user.tenant)
        {
            throw new Error("Invalid company or tenant");
        }

        var Company=req.user.company;
        var Tenant=req.user.tenant;


        logger.debug('[DVP-APPRegistry.CreateDeveloper] - [%s] - [HTTP] - Request Received  - Inputs - %s ',reqId,JSON.stringify(req.body));

        Developer.CreateDeveloper(req.body,Company,Tenant,reqId,function(err,resz)
        {


            if(err)
            {

                var jsonString = messageFormatter.FormatMessage(err, "ERROR/EXCEPTION", false, undefined);
                logger.debug('[DVP-APPRegistry.CreateDeveloper] - [%s] - Request response : %s ', reqId, jsonString);
                res.end(jsonString);
            }
            else
            {

                var jsonString = messageFormatter.FormatMessage(undefined, "SUCCESS", true, resz);
                logger.debug('[DVP-APPRegistry.CreateDeveloper] - [%s] - Request response : %s ', reqId, jsonString);
                res.end(jsonString);
            }

        });

    }
    catch(ex)
    {

        logger.error('[DVP-APPRegistry.CreateDeveloper] -dis [%s] - Exception occurred on calling method CreateDeveloper',reqId, ex);
        var jsonString = messageFormatter.FormatMessage(ex, "EXCEPTION", false, undefined);
        logger.debug('[DVP-APPRegistry.CreateDeveloper] - [%s] - Request response : %s ', reqId, jsonString);
        res.end(jsonString);
    }
    return next();
});

RestServer.get('/DVP/API/'+version+'/APPRegistry/Developers',authorization({resource:"appreg", action:"read"}),function(req,res,next) {

    var reqId='';


    try {

        try
        {
            reqId = uuid.v1();
        }
        catch(ex)
        {

        }


        if(!req.user.company || !req.user.tenant)
        {
            throw new Error("Invalid company or tenant");
        }

        var Company=req.user.company;
        var Tenant=req.user.tenant;


        logger.debug('[DVP-APPRegistry.PickDevelopers] - [%s] - [HTTP] - Request Received ',reqId);

        Developer.PickDevelopers(Company,Tenant,reqId,function(err,resz)
        {


            if(err)
            {

                var jsonString = messageFormatter.FormatMessage(err, "ERROR/EXCEPTION", false, undefined);
                logger.debug('[DVP-APPRegistry.PickDevelopers] - [%s] - Request response : %s ', reqId, jsonString);
                res.end(jsonString);
            }
            else
            {

                var jsonString = messageFormatter.FormatMessage(undefined, "SUCCESS", true, resz);
                logger.debug('[DVP-APPRegistry.PickDevelopers] - [%s] - Request response : %s ', reqId, jsonString);
                res.end(jsonString);
            }

        });

    }
    catch(ex)
    {

        logger.error('[DVP-APPRegistry.PickDevelopers] -dis [%s] - Exception occurred on calling method PickDevelopers',reqId, ex);
        var jsonString = messageFormatter.FormatMessage(ex, "EXCEPTION", false, undefined);
        logger.debug('[DVP-APPRegistry.PickDevelopers] - [%s] - Request response : %s ', reqId, jsonString);
        res.end(jsonString);
    }
    return next();
});


RestServer.post('/DVP/API/'+version+'/APPRegistry/Application',authorization({resource:"appreg", action:"write"}),function(req,res,next) {
    var reqId='';
    try {

        try
        {
            reqId = uuid.v1();
        }
        catch(ex)
        {

        }

        if(!req.user.company || !req.user.tenant) {

            throw new Error("Invalid company or tenant");
        }
        var Company=req.user.company;
        var Tenant=req.user.tenant;

        logger.debug('[DVP-APPRegistry.CreateVoiceApplication] - [%s] - [HTTP] - Request Received - Inputs - %s',reqId,JSON.stringify(req.body));
        APP.CreateVoiceApplication(req.body,Company,Tenant,reqId,function(err,resz)
        {


            if(err)
            {
                var jsonString = messageFormatter.FormatMessage(err, "ERROR/EXCEPTION", false, undefined);
                logger.debug('[DVP-APPRegistry.CreateVoiceApplication] - [%s] - Request response : %s ', reqId, jsonString);
                res.end(jsonString);
            }
            else
            {
                var jsonString = messageFormatter.FormatMessage(undefined, "SUCCESS", true, resz);
                logger.debug('[DVP-APPRegistry.CreateVoiceApplication] - [%s] - Request response : %s ', reqId, jsonString);
                res.end(jsonString);
            }

        });

    }
    catch(ex)
    {
        logger.error('[DVP-APPRegistry.CreateVoiceApplication] - [%s] - Exception occurred on method CreateVoiceApplication',reqId, ex);
        var jsonString = messageFormatter.FormatMessage(ex, "EXCEPTION", false, undefined);
        logger.debug('[DVP-APPRegistry.CreateVoiceApplication] - [%s] - Request response : %s ', reqId, jsonString);
        res.end(jsonString);
    }
    return next();
});

RestServer.post('/DVP/API/'+version+'/APPRegistry/Application/:AppID/AssignToDeveloper/:DevID',authorization({resource:"appreg", action:"write"}),function(req,res,next) {
    var reqId='';
    try {

        try
        {
            reqId = uuid.v1();
        }
        catch(ex)
        {

        }

        if(!req.user.company || !req.user.tenant)
        {
            throw new Error("Invalid company or tenant");
        }

        var Company = req.user.company;
        var Tenant = req.user.tenant;
        logger.debug('[DVP-APPRegistry.AssignApplicationToDeveloper] - [%s] - [HTTP]  - Request Received - Inputs - App %s Dev %s ', reqId, req.params.AppID, req.params.DevID);
        APP.AssignApplicationToDeveloper(req.params.AppID, req.params.DevID, Company, Tenant, reqId, function (err, resz) {


            if (err) {
                var jsonString = messageFormatter.FormatMessage(err, "ERROR/EXCEPTION", false, undefined);
                logger.debug('[DVP-APPRegistry.AssignApplicationToDeveloper] - [%s] - Request response : %s ', reqId, jsonString);
                res.end(jsonString);
            }
            else  {
                var jsonString = messageFormatter.FormatMessage(undefined, "SUCCESS", true, resz);
                logger.debug('[DVP-APPRegistry.AssignApplicationToDeveloper] - [%s] - Request response : %s ', reqId, jsonString);
                res.end(jsonString);
            }

        });

    }
    catch(ex)
    {
        logger.error('[DVP-APPRegistry.AssignApplicationToDeveloper] - [%s] - Exception occurred on method AssignApplicationToDeveloper  : App %s Dev %s ',reqId,req.params.AppID,req.params.DevID, ex);
        var jsonString = messageFormatter.FormatMessage(ex, "EXCEPTION", false, undefined);
        logger.debug('[DVP-APPRegistry.AssignApplicationToDeveloper] - [%s] - Request response : %s ', reqId, jsonString);
        res.end(jsonString);
    }
    return next();
});

RestServer.post('/DVP/API/'+version+'/APPRegistry/Application/:CAppID/SetAsMasterApp/:MAppID',authorization({resource:"appreg", action:"write"}),function(req,res,next) {
    var reqId='';
    try {

        try
        {
            reqId = uuid.v1();
        }
        catch(ex)
        {

        }

        if(!req.user.company || !req.user.tenant) {
            throw new Error("Invalid company or tenant");
        }
        var Company = req.user.company;
        var Tenant = req.user.tenant;


        logger.debug('[DVP-APPRegistry.SetMasterApp] - [%s] - [HTTP] - Request Received - Inputs - %s', reqId, req.params.MAppID);
        APP.SetMasterApp(req.params.CAppID, req.params.MAppID,Company,Tenant, reqId, function (err, resz) {


            if (err) {

                var jsonString = messageFormatter.FormatMessage(err, "ERROR/EXCEPTION", false, undefined);
                logger.debug('[DVP-APPRegistry.SetMasterApp] - [%s] - Request response : %s ', reqId, jsonString);
                res.end(jsonString);
            }
            else {

                var jsonString = messageFormatter.FormatMessage(undefined, "SUCCESS", true, resz);
                logger.debug('[DVP-APPRegistry.SetMasterApp] - [%s] - Request response : %s ', reqId, jsonString);
                res.end(jsonString);
            }

        });


    }
    catch(ex)
    {

        logger.error('[DVP-APPRegistry.SetMasterApp] - [%s] - Exception occurred on method SetMasterApp : Master App id % Child App %s ',reqId,req.params.MAppID,req.params.CAppID,ex);
        var jsonString = messageFormatter.FormatMessage(ex, "EXCEPTION", false, undefined);
        logger.debug('[DVP-APPRegistry.SetMasterApp] - [%s] - Request response : %s ', reqId, jsonString);
        res.end(jsonString);
    }
    next();
});

RestServer.put('/DVP/API/'+version+'/APPRegistry/Application/:AppID',authorization({resource:"appreg", action:"write"}),function(req,res,next) {

    var reqId='';
    try {

        try
        {
            reqId = uuid.v1();
        }
        catch(ex)
        {

        }

        if(!req.user.company || !req.user.tenant) {

            throw new Error("Invalid company or tenant");
        }


        var Company = req.user.company;
        var Tenant = req.user.tenant;
        logger.debug('[DVP-APPRegistry.UpdateApplication] - [%s] - [HTTP] - Request Received - Inputs - id %s others %s', reqId, req.params.AppID, JSON.stringify(req.body));
        APP.UpdateAppData(req.params.AppID, req.body,Company,Tenant, reqId, function (err, resz) {


            if (err) {
                var jsonString = messageFormatter.FormatMessage(err, "ERROR/EXCEPTION", false, undefined);
                logger.debug('[DVP-APPRegistry.UpdateApplication] - [%s] - Request response : %s ', reqId, jsonString);
                res.end(jsonString);
            }
            else {
                var jsonString = messageFormatter.FormatMessage(undefined, "SUCCESS", true, resz);
                logger.debug('[DVP-APPRegistry.UpdateApplication] - [%s] - Request response : %s ', reqId, jsonString);
                res.end(jsonString);
            }

        });




    }
    catch(ex)
    {
        logger.error('[DVP-APPRegistry.UpdateApplication] - [HTTP] - Exception occurred on method UpdateApplication ',reqId, ex);
        var jsonString = messageFormatter.FormatMessage(ex, "EXCEPTION", false, undefined);
        logger.debug('[DVP-APPRegistry.UpdateApplication] - [%s] - Request response : %s ', reqId, jsonString);
        res.end(jsonString);
    }
    return next();
});

RestServer.del('/DVP/API/'+version+'/APPRegistry/Application/:id',authorization({resource:"appreg", action:"write"}),function(req,res,next) {
    var reqId='';
    try {

        try
        {
            reqId = uuid.v1();
        }
        catch(ex)
        {

        }

        if(!req.user.company || !req.user.tenant) {
            throw new Error("Invalid company or tenant");
        }
        var Company = req.user.company;
        var Tenant = req.user.tenant;


        logger.debug('[DVP-APPRegistry.DeleteApplication] - [%s] - [HTTP] - Request Received - Inputs - %s', reqId, req.params.id);
        APP.DeleteApplication(req.params.id, Company,Tenant,reqId, function (err, resz) {


            if (err) {

                var jsonString = messageFormatter.FormatMessage(err, "ERROR/EXCEPTION", false, undefined);
                logger.debug('[DVP-APPRegistry.DeleteApplication] - [%s] - Request response : %s ', reqId, jsonString);
                res.end(jsonString);
            }
            else  {

                var jsonString = messageFormatter.FormatMessage(undefined, "SUCCESS", true, resz);
                logger.debug('[DVP-APPRegistry.DeleteApplication] - [%s] - Request response : %s ', reqId, jsonString);
                res.end(jsonString);
            }

        });

    }
    catch(ex)
    {

        logger.error('[DVP-APPRegistry.DeleteApplication] - [%s] - Exception occurred on method DeleteApplication : id %',reqId,req.params.id,ex);
        var jsonString = messageFormatter.FormatMessage(ex, "EXCEPTION", false, undefined);
        logger.debug('[DVP-APPRegistry.DeleteApplication] - [%s] - Request response : %s ', reqId, jsonString);
        res.end(jsonString);
    }
    return next();
});

RestServer.post('/DVP/API/'+version+'/APPRegistry/Application/:id/Activate/:status',authorization({resource:"appreg", action:"write"}),function(req,res,next) {
    var reqId='';
    try {

        try
        {
            reqId = uuid.v1();
        }
        catch(ex)
        {

        }

        if(!req.user.company || !req.user.tenant) {

            throw new Error("Invalid company or tenant");

        }
        var Company = req.user.company;
        var Tenant = req.user.tenant;

        logger.debug('[DVP-APPRegistry.ActivateApplication] - [%s] - [HTTP] - Request Received - Inputs -App %s others %s', reqId, req.params.id, JSON.stringify(req.body));

        APP.ActivateApplication(req.params.id, req.params.status,Company,Tenant, reqId, function (err, resz) {


            if (err) {

                var jsonString = messageFormatter.FormatMessage(err, "ERROR/EXCEPTION", false, undefined);
                logger.debug('[DVP-APPRegistry.ActivateApplication] - [%s] - Request response : %s ', reqId, jsonString);
                res.end(jsonString);
            }
            else {

                var jsonString = messageFormatter.FormatMessage(undefined, "SUCCESS", true, resz);
                logger.debug('[DVP-APPRegistry.ActivateApplication] - [%s] - Request response : %s ', reqId, jsonString);
                res.end(jsonString);
            }

        });


    }
    catch(ex)
    {

        logger.error('[DVP-APPRegistry.ActivateApplication] - [%s] - Exception occurred on method ActivateApplication App %s others %s',reqId,req.params.id,JSON.stringify(req),ex);
        var jsonString = messageFormatter.FormatMessage(ex, "EXCEPTION", false, undefined);
        logger.debug('[DVP-APPRegistry.ActivateApplication] - [%s] - Request response : %s ', reqId, jsonString);
        res.end(jsonString);
    }
    return next();
});

RestServer.post('/DVP/API/'+version+'/APPRegistry/Application/:AppID/URL',authorization({resource:"appreg", action:"write"}),function(req,res,next) {
    var reqId='';
    try {

        try
        {
            reqId = uuid.v1();
        }
        catch(ex)
        {

        }

        if(!req.user.company || !req.user.tenant) {

            throw new Error("Invalid company or tenant");
        }

        var Company = req.user.company;
        var Tenant = req.user.tenant;

        logger.debug('[DVP-APPRegistry.ModifyApplicationURL] - [%s] - [HTTP] - Request Received - Inputs - Id %s other %s', reqId, req.params.AppID, JSON.stringify(req.body));
        APP.ModifyApplicationURL(req.params.AppID, req.body,Company,Tenant,reqId, function (err, resz) {


            if (err) {
                var jsonString = messageFormatter.FormatMessage(err, "ERROR/EXCEPTION", false, undefined);
                logger.debug('[DVP-APPRegistry.ModifyApplicationURL] - [%s] - Request response : %s ', reqId, jsonString);
                res.end(jsonString);
            }
            else  {
                var jsonString = messageFormatter.FormatMessage(undefined, "SUCCESS", true, resz);
                logger.debug('[DVP-APPRegistry.ModifyApplicationURL] - [%s] - Request response : %s ', reqId, jsonString);
                res.end(jsonString);
            }

        });

    }
    catch(ex)
    {
        logger.error('[DVP-APPRegistry.ModifyApplicationURL] - [%s] - Exception occurred on method ModifyApplicationURL Inputs - Id %s other %s',reqId,req.params.AppID,JSON.stringify(req.body),ex);
        var jsonString = messageFormatter.FormatMessage(ex, "EXCEPTION", false, undefined);
        logger.debug('[DVP-APPRegistry.ModifyApplicationURL] - [%s] - Request response : %s ', reqId, jsonString);
        res.end(jsonString);
    }
    return next();
});

//update swagger post -> get

RestServer.get('/DVP/API/'+version+'/APPRegistry/Application/:AppID/Test',authorization({resource:"appreg", action:"read"}),function(req,res,next) {

    var reqId='';
    try {

        try
        {
            reqId = uuid.v1();
        }
        catch(ex)
        {

        }

        if(!req.user.company || !req.user.tenant) {

            throw new Error("Invalid company or tenant");

        }
        var Company = req.user.company;
        var Tenant = req.user.tenant;


        logger.debug('[DVP-APPRegistry.TestApplication] - [%s] - [HTTP] - Request Received - Inputs - id %s others %s', reqId, req.params.AppID, JSON.stringify(req.body));


        APP.TestApplication(req.params.AppID, Company,Tenant,reqId, function (err, resz) {


            if (err) {

                var jsonString = messageFormatter.FormatMessage(err, "ERROR/EXCEPTION", false, undefined);
                logger.error('[DVP-APPRegistry.TestApplication] - [%s] - Request response  ', reqId);

                res.end(jsonString);
            }
            else {
                var jsonString = messageFormatter.FormatMessage(undefined, "SUCCESS", true, resz);
                logger.debug('[DVP-APPRegistry.TestApplication] - [%s] - Request response : %s ', reqId, jsonString);
                res.end(jsonString);
            }

        });

    }
    catch(ex)
    {
        logger.error('[DVP-APPRegistry.TestApplication] - [VOICEAPP] - Exception occurred on method UrlChecker - Inputs - id %s ',reqId,req.params.AppID, ex);
        var jsonString = messageFormatter.FormatMessage(ex, "EXCEPTION", false, undefined);
        logger.debug('[DVP-APPRegistry.TestApplication] - [%s] - Request response : %s ', reqId, jsonString);
        res.end(jsonString);
    }
    return next();
});

// update on swagger
RestServer.get('/DVP/API/'+version+'/APPRegistry/Developer/:DevID/Applications',authorization({resource:"appreg", action:"read"}),function(req,res,next) {
    var reqId='';
    try {

        try
        {
            reqId = uuid.v1();
        }
        catch(ex)
        {

        }
        if(!req.user.company && !req.user.tenant) {

            throw new Error("Invalid company or tenant");
        }

        var Company = req.user.company;
        var Tenant = req.user.tenant;

        logger.debug('[DVP-APPRegistry.PickDeveloperApplications] - [%s] - [HTTP] - Request received - Inputs - %s', reqId, req.params.DevID);

        APP.PickDeveloperApplications(req.params.DevID,Company,Tenant, reqId, function (err, resz) {


            if (err) {
                var jsonString = messageFormatter.FormatMessage(err, "ERROR/EXCEPTION", false, undefined);
                logger.debug('[DVP-APPRegistry.PickDeveloperApplications] - [%s] - Request response : %s ', reqId, jsonString);
                res.end(jsonString);
            }
            else  {
                var jsonString = messageFormatter.FormatMessage(undefined, "SUCCESS", true, resz);
                logger.debug('[DVP-APPRegistry.PickDeveloperApplications] - [%s] - Request response : %s ', reqId, jsonString);
                res.end(jsonString);
            }

        });

    }
    catch(ex)
    {

        logger.error('[DVP-APPRegistry.PickDeveloperApplications] - [%s] - Exception occurred on method PickDeveloperApplications', ex);
        var jsonString = messageFormatter.FormatMessage(ex, "EXCEPTION", false, undefined);
        logger.debug('[DVP-APPRegistry.PickDeveloperApplications] - [%s] - Request response : %s ', reqId, jsonString);
        res.end(jsonString);
    }
    return next();
});

RestServer.get('/DVP/API/'+version+'/APPRegistry/ApplicationDetails/:AppID',authorization({resource:"appreg", action:"read"}),function(req,res,next) {
    var reqId='';
    try {

        try
        {
            reqId = uuid.v1();
        }
        catch(ex)
        {

        }

        if(!req.user.company || !req.user.tenant)
        {
            throw new Error("Invalid company or tenant");
        }

        var Company = req.user.company;
        var Tenant = req.user.tenant;

        logger.debug('[DVP-APPRegistry.PickApplicationRecord] - [%s] - [HTTP] - Request received - Inputs - AppID : $s Developer : %s', reqId, req.params.VID);
        APP.PickApplicationRecord(req.params.AppID,Company,Tenant, reqId, function (err, resz) {


            if (err) {

                logger.error('[DVP-APPRegistry.PickApplicationRecord] - [VOICEAPP] - Error occurred on method PickApplicationRecord - Records - AppID : ' + req.params.AppId);
                var jsonString = messageFormatter.FormatMessage(err, "ERROR/EXCEPTION", false, undefined);
                logger.debug('[DVP-APPRegistry.PickApplicationRecord] - [%s] - Request response : %s ', reqId, jsonString);
                res.end(jsonString);
            }
            else {


                var jsonString = messageFormatter.FormatMessage(undefined, "SUCCESS", true, resz);
                logger.debug('[DVP-APPRegistry.PickApplicationRecord] - [%s] - Request response : %s ', reqId, jsonString);
                res.end(jsonString);
            }

        });



    }
    catch(ex)
    {
        logger.error('[DVP-APPRegistry.PickApplicationRecord] - [%s] - Exception occurred on method PickApplicationRecord',reqId, ex);
        var jsonString = messageFormatter.FormatMessage(ex, "EXCEPTION", false, undefined);
        logger.debug('[DVP-APPRegistry.PickApplicationRecord] - [%s] - Request response : %s ', reqId, jsonString);
        res.end(jsonString);
    }
    return next();
});

RestServer.get('/DVP/API/'+version+'/APPRegistry/Applications',authorization({resource:"appreg", action:"read"}),function(req,res,next) {
    var reqId='';
    try {

        try
        {
            reqId = uuid.v1();
        }
        catch(ex)
        {

        }

        if(!req.user.company || !req.user.tenant)
        {
            throw new Error("Invalid company or tenant");
        }

        var Company = req.user.company;
        var Tenant = req.user.tenant;
        logger.debug('[DVP-APPRegistry.PickAllApplications] - [%s] - [HTTP] - Request received', reqId);
        APP.PickAllApplications(reqId,Company,Tenant, function (err, resz) {


            if (err) {

                logger.error('[DVP-APPRegistry.PickAllApplications] - [VOICEAPP] - Error occurred on method PickAllApplications ');
                var jsonString = messageFormatter.FormatMessage(err, "ERROR/EXCEPTION", false, undefined);
                logger.debug('[DVP-APPRegistry.PickAllApplications] - [%s] - Request response : %s ', reqId, jsonString);
                res.end(jsonString);
            }
            else {

                logger.debug('[DVP-APPRegistry.PickAllApplications] - [VOICEAPP] - Record found - Returns - ' + resz);
                var jsonString = messageFormatter.FormatMessage(undefined, "SUCCESS", true, resz);
                logger.debug('[DVP-APPRegistry.PickAllApplications] - [%s] - Request response : %s ', reqId, jsonString);
                res.end(jsonString);
            }

        });


    }
    catch(ex)
    {
        logger.error('[DVP-APPRegistry.PickAllApplications] - [%s] - Exception occurred on method PickApplicationRecord',reqId, ex);
        var jsonString = messageFormatter.FormatMessage(ex, "EXCEPTION", false, undefined);
        logger.debug('[DVP-APPRegistry.PickAllApplications] - [%s] - Request response : %s ', reqId, jsonString);
        res.end(jsonString);
    }
    return next();
});

RestServer.get('/DVP/API/'+version+'/APPRegistry/Applications/:status',authorization({resource:"appreg", action:"read"}),function(req,res,next) {
    var reqId='';
    try {

        try {
            reqId = uuid.v1();
        }
        catch (ex) {

        }

        if (!req.user.company || !req.user.tenant) {

            throw new Error("Invalid company or tenant");
        }


        var Company = req.user.company;
        var Tenant = req.user.tenant;

        logger.debug('[DVP-APPRegistry.PickActivatedApplications] - [%s] - [HTTP] - Request received', reqId);
        APP.PickActiveApplications(req.params.status, Company, Tenant, reqId, function (err, resz) {


            if (err)
            {

                logger.error('[DVP-APPRegistry.PickActiveApplications] - [VOICEAPP] - Error occurred on method PickActiveApplications ');
                var jsonString = messageFormatter.FormatMessage(err, "ERROR/EXCEPTION", false, undefined);
                logger.debug('[DVP-APPRegistry.PickActiveApplications] - [%s] - Request response : %s ', reqId, jsonString);
                res.end(jsonString);
            }
            else
            {

                logger.debug('[DVP-APPRegistry.PickActiveApplications] - [VOICEAPP] - Record found - Returns - ' + resz);
                var jsonString = messageFormatter.FormatMessage(undefined, "SUCCESS", true, resz);
                logger.debug('[DVP-APPRegistry.PickActiveApplications] - [%s] - Request response : %s ', reqId, jsonString);
                res.end(jsonString);
            }


        });
    }

    catch(ex)
    {
        logger.error('[DVP-APPRegistry.PickActiveApplications] - [%s] - Exception occurred on method PickActiveApplications',reqId, ex);
        var jsonString = messageFormatter.FormatMessage(ex, "EXCEPTION", false, undefined);
        logger.debug('[DVP-APPRegistry.PickActiveApplications] - [%s] - Request response : %s ', reqId, jsonString);
        res.end(jsonString);
    }
    return next();
});
//no swagger


function Crossdomain(req,res,next){


    var xml='<?xml version=""1.0""?><!DOCTYPE cross-domain-policy SYSTEM ""http://www.macromedia.com/xml/dtds/cross-domain-policy.dtd""> <cross-domain-policy>    <allow-access-from domain=""*"" />        </cross-domain-policy>';

    /*var xml='<?xml version="1.0"?>\n';

     xml+= '<!DOCTYPE cross-domain-policy SYSTEM "/xml/dtds/cross-domain-policy.dtd">\n';
     xml+='';
     xml+=' \n';
     xml+='\n';
     xml+='';*/
    req.setEncoding('utf8');
    res.end(xml);

}

function Clientaccesspolicy(req,res,next){


    var xml='<?xml version="1.0" encoding="utf-8" ?>       <access-policy>        <cross-domain-access>        <policy>        <allow-from http-request-headers="*">        <domain uri="*"/>        </allow-from>        <grant-to>        <resource include-subpaths="true" path="/"/>        </grant-to>        </policy>        </cross-domain-access>        </access-policy>';
    req.setEncoding('utf8');
    res.end(xml);

}

module.exports = RestServer;

RestServer.get("/crossdomain.xml",Crossdomain);
RestServer.get("/clientaccesspolicy.xml",Clientaccesspolicy);

