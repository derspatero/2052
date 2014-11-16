var _fileSystemRoot;
// var _fileName;

// Wait for device API libraries to load
//
document.addEventListener("deviceready",     
    function () {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 
            0, 
            function (fileSystem) {
                _fileSystemRoot = fileSystem.root;
            }, 
            fail
        );
    }, 
    false
);

// device APIs are available
//


function writeFile(fileName, textToWrite) {

    _fileSystemRoot.getFile(fileName, 
        {create: true, exclusive: false}, 
        function (fileEntry) {
            fileEntry.createWriter(
                function (writer) {
                    writer.onwriteend = function(evt) {
                        alert("contents of file now '" + textToWrite + "'");
                    };
                    writer.write(textToWrite);
                }, 
                fail
            );
        }, 
        fail
    );
}   

function fail(error) {
    console.log(error.code);
    alert(error);
}


function getFile(file_name) {
    _fileSystemRoot.getFile(
        file_name, 
        null, 
        function (fileEntry) {
            fileEntry.file(
                function (file) {
                    var reader = new FileReader();
                    reader.onloadend = function(evt) {
                        console.log("Read as text");
                        $("#my_file").html("File Name: " + file_name + "<br /><br />" + evt.target.result);
                    };
                    reader.readAsText(file);
                }, 
                fail
            );
        }, 
        fail
    );
}





