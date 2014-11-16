
var _fileSystemRoot;
var _pathToPackage = "Android/data/ca.comp2052.a00892244";

// Wait for device API libraries to load
//
document.addEventListener("deviceready",     
    function () {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 
            0, 
            function (fileSystem) {
                _fileSystemRoot = fileSystem.root;
                _fileSystemRoot.getDirectory(
                    _pathToPackage, 
                    {create: true, exclusive: false},
                    function(dir)   { /* SUCCESS CALLBACK CODE */ },
                    function(error) { /* FAILURE CALLBACK CODE */ }
                );
            }, 
            fail
        );
    }, 
    false
);

// device APIs are available
//



function writeFile(fileName, textToWrite) {
    _fileSystemRoot.getFile(_pathToPackage + '/' + fileName, 
        {create: true, exclusive: false}, 
        function (fileEntry) {
            fileEntry.createWriter(
                function (writer) {
                    writer.onwriteend = function(evt) {
                        alert("contents of file " + _pathToPackage + '/' +  fileName + ": '" + textToWrite + "'");
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
        _pathToPackage + '/' + file_name, 
        null, 
        function (fileEntry) {
            fileEntry.file(
                function (file) {
                    var reader = new FileReader();
                    reader.onloadend = function(evt) {
                        console.log("Read as text");
                        $("#my_file").html("File Name: " + _pathToPackage + '/' + file_name + "<br /><br />" + evt.target.result);
                    };
                    reader.readAsText(file);
                }, 
                fail
            );
        }, 
        fail
    );
}





