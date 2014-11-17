
var _fileSystemRoot;
var _pathToPackage = "Android/data/ca.comp2052.a00892244";
var _packageDirectory;

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
                        AndroidToast.showShortToast("contents of file " + _pathToPackage + '/' +  fileName + ": '" + textToWrite + "'");
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

function getFile2(file_name) {
    alert(file_name);
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

// Get a list of all the entries in the directory
function showdirectory(displayId) {
    // Get a directory reader
    var directoryReader = _fileSystemRoot.createReader();
    
    directoryReader.readEntries(function (entries) {
            $(displayId).append("<em>sdcard0 Contents:</em><br />");
            for (var i=0; i<entries.length; i++) {
                console.log(entries[i].name);
                if (entries[i].isDirectory) {
                    $(displayId).append('<a>' + entries[i].name + '</a><br />');
                }
                else if (entries[i].isFile) {
                    $(displayId).append('<a onclick="getFile2(' + entries[i].name + ')">' + entries[i].name + '</a><br />');
                }    
            }
        },
        function (error) {
            alert("Failed to list directory contents: " + error.code);
        }
    );
}


