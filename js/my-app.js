var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'LiveAgent',
    // App id
    id: 'com.liveagent.chat',
    // theme: 'ios',
    pane: {
        swipe: true,
    },
    theme: 'ios',
    // ... other parameters
});

const mainView = app.views.create('.view-main');

const panelMenu = app.panel.create({
    el: '.panel-menu',
    visibleBreakpoint: 1024,
})

const panelDetails = app.panel.create({
    el: '.panel-details',
    visibleBreakpoint: 1024,
})

const $$ = Dom7;

// Init Messages
const messages = app.messages.create({
    el: '.messages',

    // First message rule
    firstMessageRule: function (message, previousMessage, nextMessage) {
        // Skip if title
        if (message.isTitle) return false;
        /* if:
          - there is no previous message
          - or previous message type (send/received) is different
          - or previous message sender name is different
        */
        if (!previousMessage || previousMessage.type !== message.type || previousMessage.name !== message.name) return true;
        return false;
    },
    // Last message rule
    lastMessageRule: function (message, previousMessage, nextMessage) {
        // Skip if title
        if (message.isTitle) return false;
        /* if:
          - there is no next message
          - or next message type (send/received) is different
          - or next message sender name is different
        */
        if (!nextMessage || nextMessage.type !== message.type || nextMessage.name !== message.name) return true;
        return false;
    },
    // Last message rule
    tailMessageRule: function (message, previousMessage, nextMessage) {
        // Skip if title
        if (message.isTitle) return false;
        /* if (basically same as lastMessageRule):
        - there is no next message
        - or next message type (send/received) is different
        - or next message sender name is different
      */
        if (!nextMessage || nextMessage.type !== message.type || nextMessage.name !== message.name) return true;
        return false;
    }
});


