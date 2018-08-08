        <footer>
            <div class="container"></div>
        </footer>

        <!-- Load Scripts -->
        <script src="assets/js/1.0.jquery.min.js" defer></script>
        <script src="assets/js/1.1.fancybox.min.js" defer></script>
        <script src="assets/js/1.2.webfont.js" defer></script>
        <script src="assets/js/1.3.lozad.js" defer></script>
        <script src="assets/js/1.4.forms.js" defer></script>
        <script src="assets/js/1.9.app.js" defer></script>

        <!-- Load Styles -->
        <noscript id="deferred-styles">
            <link rel="stylesheet" href="assets/css/1.1.forms.css">
            <link rel="stylesheet" href="assets/css/1.2.fancybox.css">
            <link rel="stylesheet" href="assets/css/1.9.styles.css">
        </noscript>

        <script>
            var loadDeferredStyles = function() {
                
                var addStylesNode = document.getElementById("deferred-styles");
                var replacement = document.createElement("div");

                replacement.innerHTML = addStylesNode.textContent;
                document.body.appendChild(replacement)
                addStylesNode.parentElement.removeChild(addStylesNode);
            };

            var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

            if (raf) raf(function() { window.setTimeout(loadDeferredStyles, 0); });

            else window.addEventListener('load', loadDeferredStyles);
        </script>
    </body>
</html>