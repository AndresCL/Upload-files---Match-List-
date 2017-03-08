// Initializing Foundation
$(document).foundation();

// Initialize
var wowIt;
var browseFiles;
var removeAllFiles;

// On Ready
$(document).ready(function(){
    
    /////////////////////////////////////////////////////////////////
    // MAGIC AGENDA ITEM
    // Allows to auto assign the file into a item in the agenda list
    // Developed by: Andrés Contreras Leiva
    // Contact: aecontrerasl@gmail.com
    /////////////////////////////////////////////////////////////////

    // Agenda items and its IDs
    var containers = [
                    {id: "1_admin", txt:"1 admin"},
                    {id: "2_minutes_last_meeting", txt: "2 minutes last meeting"},
                    {id: "3_performance_key_initiatives", txt: "3 performance key initiatives"},
                    {id: "4_management_update", txt: "4 management update"},
                    {id: "5_country_managers_outlook", txt: "5 country managers outlook"},
                    {id: "5-1_switzerland_austria_italy", txt: "5.1 switzerland austria italy"},
                    {id: "5-2_germany", txt: "5.2 germany"},
                    {id: "5-3_france", txt: "5.3 france"},
                    {id: "6_sales_marketing", txt: "6 sales marketing"}
                    ];

    // Configuring dropzone
    var dropzone;
    Dropzone.options.dropzone = {
        //paramName: "file",
        //maxFilesize: 2, // MB
        autoProcessQueue: false,
        accept: function(file, done) {

            done(); 
        },
        init: function() {
            dropzone = this;
            this.on( 'reset', function(){
                this.removeAllFiles(true);
            });

            // Listener to see when documents are added to dropzone to enable/disable 
            // allocate button
            this.on("addedfile", function(file) { 
                
                $('#btn_allocate').attr( "disabled", false);
                $('#btn_remove_files').attr( "disabled", false);

            });

            // If file is removed, count total items, and see if allocate button
            // needs be disabled
            this.on("removedfile", function(file) {

                if(this.files.length == 0){
                    
                    $('#btn_allocate').attr( "disabled", true);
                    $('#btn_remove_files').attr( "disabled", true);
                }
            });
        }
    };

    // Triggers dropzone to select files
    browseFiles = function(){
        $("#dropzone").click();
    }

    removeAllFiles = function removeAllFiles(){
        dropzone.removeAllFiles(true);
    }

    ///////////////////////////////////////////////////////////////////
    // THE MAGIC
    ///////////////////////////////////////////////////////////////////
    // wowIt: applies labels with documents for possible association
    wowIt = function wowIt(){

        // Removing existing labels
        $(".magic-label").remove();

        // Remove everything from dropzone
        //dropzone.removeAllFiles(true);

        // Each file
        for (var i = 0; i < dropzone.files.length; i++)
        {
            // Getting file
            var file = dropzone.files[i];

            // Process file name
            addLabel(file.name);
        };

        $(".msg").html("We have auto allocated this documents to your agenda topics.").fadeOut(500).fadeIn(1000);

    }


    // addLabel: This function process file name and tries to match with some Agenda Item.
    function addLabel(name){
    
        // Getting filename without file format
        var cleanname = name.replace(/\.[^/.]+$/, "").replace("_", " ");

        // If filename has spaces e.g.: "something like this(.doc)" we split it and
        // save into array
        var filename_chunks = cleanname.split(" ");

        // Each agenda items
        $.each(containers, function(idxcont, agenda_item) {

            // Each file name chunks
            $.each(filename_chunks, function(idxchunk, name_chunk) {
            
                // Split agenda title in chunks so we can find in two ways needle->haystack and haystack->needle
                var agenda_title_chunk = agenda_item.txt.split(" ");

                // Each agenda title chunks
                $.each(agenda_title_chunk, function(idxachunk, agenda_item_chunk) {

                    // If container txt has any part of the string name
                    if (agenda_item.txt.indexOf(name_chunk) >= 0 || name_chunk.indexOf(agenda_item_chunk) >= 0){

                        // We append the to-be-uploaded document name to it as label
                        $("#" + agenda_item.id + " a").append('<span class="magic-label label">' + name + '</span>');

                        // Return false to avoid double label if string is found more than once per item
                        return false;
                    }
                });

            });
        });

    }

});