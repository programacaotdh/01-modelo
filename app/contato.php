<?php include 'header.php'; ?>
    <?php
        if(!empty($_GET['status'])) {
            $retorno = $_GET['status'];
        }
    ?>
    <main class="page-contact">
        <div class="container">
            <?php if(empty($retorno)): ?>
            <form id="contato" name="contato" method="post">
                <input type="hidden" name="source" value="Formulário de Contato" />
                <input type="hidden" name="hash" value="<?=md5(date('dmYh').session_id().$_SERVER['REMOTE_ADDR'])?>" />

                <div class="fields">
                    <div class="row">
                        <div class="field grid-6">
                            <label for="contato_nome">*Nome Completo</label>
                            <input type="text" id="contato_nome" name="nome" class="inputbox" data-name="Nome" placeholder="Digite seu nome..." />
                        </div>

                        <div class="field grid-6">
                            <label for="contato_email">*E-mail</label>
                            <input type="email" id="contato_email" name="email" class="inputbox" data-name="E-mail" placeholder="Digite seu e-mail..." />
                        </div>

                        <div class="field grid-6">
                            <label for="contato_telefone">*Telefone/Celular</label>
                            <input type="tel" id="contato_telefone" name="telefone" class="inputbox phone" data-name="Telefone" placeholder="(99) 9 9999-9999" />
                        </div>

                        <div class="field grid-6">
                            <label for="contato_assunto">Assunto</label>
                            <input type="text" id="contato_assunto" name="assunto" class="inputbox" data-name="Assunto" placeholder="Dúvida, sugestão, comentário..." />
                        </div>

                        <div class="field grid-12">
                            <label for="contato_mensagem">*Mensagem</label>
                            <textarea id="contato_mensagem" name="mensagem" class="inputbox textarea" data-name="Mensagem" placeholder="Digite sua mensagem..."></textarea>
                        </div>
                    </div>

                    <div class="buttons">
                        <button type="submit" class="button">Enviar mensagem</button>
                        <div class="loading"><span>Carregando...<span class="loader"></span></span></div>
                    </div>
                </div>
            </form>
            <?php endif; ?>

            <?php if(!empty($retorno) && $retorno == 'sucesso'): ?>
            <div class="form-alert success">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 490.4 490.4" width="60" height="60"><path d="M245.2 0C110 0 0 110 0 245.2s110 245.2 245.2 245.2 245.2-110 245.2-245.2S380.4 0 245.2 0zM245.2 465.9c-121.7 0-220.7-99-220.7-220.7s99-220.7 220.7-220.7 220.7 99 220.7 220.7S366.9 465.9 245.2 465.9z" class="a"/><path d="M309.4 185.5l-94 93.5 -34.3-34.5c-4.8-4.8-12.5-4.8-17.3-0.1 -4.8 4.7-4.8 12.5-0.1 17.3l42.9 43.2c2.4 2.4 5.5 3.6 8.7 3.6 3.1 0 6.2-1.2 8.6-3.6l102.7-102.1c4.8-4.8 4.8-12.5 0.1-17.3C321.9 180.7 314.2 180.7 309.4 185.5z" class="a"/></svg>
                <h2>Mensagem enviada com sucesso! <span>Em breve retornaremos seu contato.</span></h2>
            </div>
            <?php endif; ?>

            <div class="form-alert error hidden">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 475.2 475.2" width="60" height="60"><path d="M405.6 69.6C360.7 24.7 301.1 0 237.6 0s-123.1 24.7-168 69.6S0 174.1 0 237.6s24.7 123.1 69.6 168 104.5 69.6 168 69.6 123.1-24.7 168-69.6 69.6-104.5 69.6-168-24.7-123.1-69.6-168zm-19.1 316.9c-39.8 39.8-92.7 61.7-148.9 61.7s-109.1-21.9-148.9-61.7c-82.1-82.1-82.1-215.7 0-297.8C128.5 48.9 181.4 27 237.6 27s109.1 21.9 148.9 61.7c82.1 82.1 82.1 215.7 0 297.8z" class="a"/><path d="M342.3 132.9c-5.3-5.3-13.8-5.3-19.1 0l-85.6 85.6-85.6-85.6c-5.3-5.3-13.8-5.3-19.1 0-5.3 5.3-5.3 13.8 0 19.1l85.6 85.6-85.6 85.6c-5.3 5.3-5.3 13.8 0 19.1 2.6 2.6 6.1 4 9.5 4s6.9-1.3 9.5-4l85.6-85.6 85.6 85.6c2.6 2.6 6.1 4 9.5 4 3.5 0 6.9-1.3 9.5-4 5.3-5.3 5.3-13.8 0-19.1l-85.4-85.6 85.6-85.6c5.3-5.3 5.3-13.8 0-19.1z" class="a"/></svg>
                <h2>Ocorreu um erro! <span>Não foi possível enviar sua mensagem.</span></h2>
            </div>
        </div>
    </main>
<?php include 'footer.php'; ?>