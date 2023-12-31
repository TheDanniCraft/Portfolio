import React from 'react';

class ChatwootWidget extends React.Component {
    componentDidMount() {
        // Add Chatwoot Settings
        window.chatwootSettings = {
            hideMessageBubble: true,
            position: 'right',
            locale: 'en',
            type: 'standard',
            darkMode: 'dark',
        };

        // Paste the script from inbox settings except the <script> tag
        (function (d, t) {
            var BASE_URL = "https://chat.thedannicraft.de";
            var g = d.createElement(t), s = d.getElementsByTagName(t)[0];
            g.src = BASE_URL + "/packs/js/sdk.js";
            s.parentNode.insertBefore(g, s);
            g.async = !0;
            g.onload = function () {
                window.chatwootSDK.run({
                    websiteToken: 'D565s8bZ1R3UUbF3t8JBaCs4',
                    baseUrl: BASE_URL
                })
            }
        })(document, "script");
    }

    render() {
        return null;
    }
}

export default ChatwootWidget