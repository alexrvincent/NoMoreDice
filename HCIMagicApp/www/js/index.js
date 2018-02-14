/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


/* GAME TYPES:
Magic = 0
Munchkin = 1 */
var Game = function(type, player1, player2) {
    this.type = type;
    this.player1 = player1;
    this.player2 = player2;
    console.log("Game instantiated");
}


var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        if (window.jQuery) {  
            // jQuery is loaded 
            console.log("JQuery detected!");
        } else {
            // jQuery is not loaded
            console.log("No JQuery detected.");
        }

        var game = new Game(0, "Logan", "Max");
        this.addCurGameElement(game);
        game = new Game(1, "Alex", "Tyler");
        this.addCurGameElement(game);
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        console.log("Got here");
        var element = document.getElementById('deviceProperties');
        element.innerHTML += 'Device Model: '    + device.model    + '<br />' +
                             'Device Cordova: '  + device.cordova  + '<br />' +
                             'Device Platform: ' + device.platform + '<br />' +
                             'Device UUID: '     + device.uuid     + '<br />' +
                             'Device Version: '  + device.version  + '<br />';
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        //alert(id);
        /*var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);*/
    },

    // HCI MAGIC APP FUNCTIONS
    addCurGameElement: function(game) {
        var img;
        switch(game.type){
            case 0:
                img = "mtg_icon.png";
                break;
            case 1: 
                img = "munchkin_icon.png";
                break;
            default:
                img = "icon.png";
                break;
        }
        document.getElementById('currentgames').innerHTML += 
            '<table align=\'center\' class=\'singlegame\'>' +
                '<tr>' +
                    '<td class=\'gameicon\'><img class=\'gameicon\' src=\'img/' + img + '\'></td>' + 
                    '<td class=\'gametitle\'>' + game.player1 + ' vs. ' + game.player2 + '</td>' +
                '</tr>' +
            '</table>';
    }
};
