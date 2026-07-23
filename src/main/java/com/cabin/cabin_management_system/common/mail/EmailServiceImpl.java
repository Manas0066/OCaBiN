package com.cabin.cabin_management_system.common.mail;

import com.cabin.cabin_management_system.auth.entity.User;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    public EmailServiceImpl(
            JavaMailSender mailSender,
            TemplateEngine templateEngine
    ) {
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
    }

    @Override
    public void sendTemporaryPasswordMail(
            User user,
            String temporaryPassword
    ) {

        try {

            Context context = new Context();

            context.setVariable("name", user.getName());
            context.setVariable("email", user.getEmail());
            context.setVariable("temporaryPassword", temporaryPassword);
            context.setVariable("loginUrl", "http://localhost:3000/login");

            String html = templateEngine.process(
                    "temporary-password-mail",
                    context
            );

            MimeMessage message = mailSender.createMimeMessage();

            MimeMessageHelper helper =
                    new MimeMessageHelper(message, true);

            helper.setTo(user.getEmail());

            helper.setSubject("Welcome to OCaBiN");

            helper.setText(html, true);

            mailSender.send(message);

        } catch (MessagingException e) {

            throw new RuntimeException(
                    "Unable to send email.",
                    e
            );

        }
    }
}