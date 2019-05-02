const assert = require("assert");
const mongoose = require("mongoose");
const Progress = require("../models/progress");

describe("Nesting records", function() {

    //
    it("Creates a Progress entry with sub-documents", function(done){

        var ProgressNote1 = new Progress ({
            userID: "TestUser123",
            weeks: [{week: 1}]
        });

        ProgressNote1.save().then(function(){
                Progress.findOne({userID: "TestUser123"}).then(function(record){
                    assert(record.weeks.week === 1);
                    done();

                });
            });
    });
});
