// Init Messagebar
const messagebar = app.messagebar.create({
    el: '.messagebar'
});

// Response flag for receiveMessage
let responseInProgress = false;

//Get Date & Time
let today = new Date();
let getDate = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
let getTime = today.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

// Dummy response
let answers = [
    'Yes!',
    'No',
    'Hm...',
    'I am not sure',
    'And what about you?',
    'May be ;)',
    'Lorem ipsum dolor sit amet, consectetur',
    'What?',
    'Are you sure?',
    'Of course',
    'Need to think about it',
    'Amazing!!!'
]

// Dummy people
let people = [
    {
        name: 'Alea Harris'
    },
    {
        name: 'Blue Ninja',
    },
    {
        name: 'Diana Jenkins'
    },
    {
        name: 'Irvan Smith'
    },
    {
        name: 'Kate Johnson',
    },
];

//Append date & time for MessageContent
$('#dateMsg').text(getDate);
$('#timeMsg').text(getTime);

// Send Message With Enter
$$('#inputMsg').on('keyup', function (e) {
    if ($$(this).val() != '') {
        $$('.send-link').show();
        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            $$('.send-link').click();
        }
    } else {
        $$('.send-link').hide();
    }
})

//hide component before load
$('.messages, .panel, .navbar, .toolbar').hide();

$(window).on('load', function () {
    setTimeout(removeLoader, 800); //wait for page to load
});


// Send Message With Button
$$('.send-link').on('click', function () {
    let text = messagebar.getValue().replace(/\n/g, '<br>').trim();
    // return if empty message
    if (!text.length) return;
    // Clear area
    messagebar.clear();

    // Return focus to area
    messagebar.focus();

    // Add message to messages
    messages.addMessage({
        text: text,
        textFooter: getTime,
    });

    //scroll page
    $$('.page-content').scrollTop($('.page-content').get(0).scrollHeight, 400);

    //hide button send
    $(this).hide();

    if (responseInProgress) return;
    // Receive dummy message
    receiveMessage();
});


//Remove loader
function removeLoader() {
    $("#loading").fadeOut(500, function () {
        // fadeOut complete. Remove the loading div
        $("#loading").remove(); //makes page more lightweight 
        $('.messages, .panel, .navbar, .toolbar').show();
    });
}

//Generate Avatar Image from UI Avatars API
function generateAvatar(value) {
    let theText = value.replace(/\s+/g, '+'); //remove space
    let theUrl = `https://ui-avatars.com/api/?rounded=true&background=ffdd00&color=222&name=${theText}`;
    return theUrl;
}

//Get random message
function receiveMessage() {
    responseInProgress = true;
    setTimeout(function () {
        // Get random answer and random person
        let answer = answers[Math.floor(Math.random() * answers.length)];
        let person = people[Math.floor(Math.random() * people.length)];

        // Show typing indicator
        messages.showTyping({
            header: person.name + ' is typing',
            avatar: generateAvatar(person.name)
        });

        setTimeout(function () {
            // Add received dummy message
            messages.addMessage({
                text: answer,
                type: 'received',
                name: person.name,
                avatar: generateAvatar(person.name),
                textFooter: getTime
            });
            // Hide typing indicator
            messages.hideTyping();
            responseInProgress = false;
        }, 4000);
    }, 1000);
}

// Append List myChat
function getMyChats() {
    for(let ic = 3; ic < people.length; ic++) {
        let listContent = `<li><a id="handleMyChats-${ic}" href="#" class="item-link item-content">
                <div class="item-media">
                    <img id="chatAva-${ic}" width="50"
                    src="${generateAvatar(people[ic].name)}"
                    alt="">
                </div>
                <div class="item-inner">
                    <div class="item-title-row">
                        <div class="item-title chattitle" id="chatName-${ic}">${people[ic].name}</div>
                        <div class="item-after">17:14</div>
                    </div>
                    <div class="item-text chattext">Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit.
                    </div>
                </div></a></li>`
                $(listContent).appendTo('#myChatList');

            $(`#handleMyChats-${ic}`).on('click', function () {
                let chatAva = $(`#chatAva-${ic}`).attr('src');
                let chatName = $(`#chatName-${ic}`).text();
                let detailEmail = chatName.replace(/\s+/g, '')
                
                $('#titleChatRoom').text(chatName);
                $('#detailsAva').attr('src', chatAva);
                $('#detailsName').text(chatName);
                $('#detailsEmail').text(detailEmail+'@gmail.com');
            })
    }
                
}

// Append List queuedChat
function getQueChats() {
    for(let iq = 2; iq < people.length; iq--) {
        let listQueContent = `<li><a href="#" class="item-link item-content">
                <div class="item-media">
                    <img width="50"
                    src="${generateAvatar(people[iq].name)}"
                    alt="">
                </div>
                <div class="item-inner">
                    <div class="item-title-row">
                        <div class="item-title chattitle">${people[iq].name}</div>
                        <div class="item-after">17:14</div>
                    </div>
                    <div class="item-text chattext">Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit.
                    </div>
                </div></a></li>`
                $(listQueContent).appendTo('#myQueList');
    }            
}

getMyChats()
getQueChats()
