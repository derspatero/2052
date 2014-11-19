
var _fileSystemRoot;
var _pathToPackage = "Android/data/ca.comp2052.a00892244/";


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
    alert("fail!: " + error);
}

function openFileFromDefaultLocation(file_name, displayId) {
    file_name = _pathToPackage + file_name;  
    // alert("default path added: " + file_name);
    getFile(file_name, displayId);
}

function getFile(file_name, displayId) {
    // alert("getFile(" + file_name + "," + displayId + ")");
    _fileSystemRoot.getFile(
        file_name, 
        null, 
        function (fileEntry) {
            fileEntry.file(
                function (file) {
                    var reader = new FileReader();
                    reader.onloadend = function(evt) {
                        console.log("Read as text");
                        $(displayId).html("File Name: " + file_name + "<hr /><p>" + evt.target.result + "</p>");
                    };
                    reader.readAsText(file);
                }, 
                fail
            );
        }, 
        fail
    );
}


function showdirectory(displayId, fileDisplayId){
    openDirectory("", displayId, fileDisplayId);
}

function openDirectory(path, displayId, fileDisplayId) {
    _fileSystemRoot.getDirectory(path, {create: false, exclusive: false}, function (dirEntry) {
        var directoryReader = dirEntry.createReader();
        var onclickfunction;
        var patharray = path.split("/");
        var target = "";

// 
// Calculate and display parent path
//    
        for (var i = 0; i < patharray.length - 2; i++) {
            target += patharray[i] + "/";
        };
        
        $(displayId).html("<em>Folder: " + path + "</em><br /><hr>");

        if(path != ""){
            onclickfunction = "openDirectory('" + target + "','" + displayId + "','" + fileDisplayId + "')";
            $(displayId).append('<a id="parent_path">../  (parent folder)</a><br /><br />');
            $("#parent_path").attr("onclick",onclickfunction);
        }


//
// Display folder items
// 
        directoryReader.readEntries(function (entries) {
            for (var i=0; i<entries.length; i++) {
                console.log(entries[i].name);
                if (entries[i].isDirectory) {
                    target = path + entries[i].name + '/';
                    onclickfunction = "openDirectory('" + target + "','" + displayId + "','" + fileDisplayId + "')";
                     $(displayId).append('<a id="menu-folder-item-' + i + '">' + entries[i].name + '/</a><br /><br />');
                    $("#menu-folder-item-"+i).attr("onclick",onclickfunction);
                }
                else if (entries[i].isFile) {
                    var filename = entries[i].name;
                    onclickfunction = "getFile('" + path + filename + "','" + fileDisplayId + "')";
                    // alert(onclickfunction);
                    $(displayId).append('<a id="menu-file-item-' + i + '" class="menu-item-file">' + filename + '</a><br /><br />');
                    $("#menu-file-item-"+i).attr("onclick",onclickfunction);
            
                }    
            }
        },fail);
    }, fail);  
}







