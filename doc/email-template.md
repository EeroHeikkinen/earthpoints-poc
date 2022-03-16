# Daily E-mail Template Manager

This document describes how to use the manager screen for daily e-mail message templates.

The url of the manager:
```
https://epoints.savesoil.cc/email-template
```

Note: this page requires an username and a password to access.

## Purpose Of the Manager

This page allows admins to manage the email content that is being sent to every user by the earth points system. To enrich the content of the email, admins can login to this page and save an email html template for every different date. An email will be sending everyday to the user according to the given template. If the system can not find any template for the specific date the default template of the system will be used. 

## Template Format

The template format is in [handlebars](https://handlebarsjs.com/) format. Html you are going to save can use some variables. the following tokens can be used by wrapping the token with double curlly brackets e.g. {{firstName}}

- **{{points}}**: This token retreives the user's total point earned so far.
- **{{pointsEarnedToday}}**: this token retrives the total points only the user earned that day. (the day that the email has sent)
- **{{firstName}}**: this token is the first name of the user.
- **{{footerImage}}**: This token retrives the image url of the user's point point status badge image. An [example](https://epoints.savesoil.cc/point-badge?point=100&total=560&streak=100&theme=green_top&confetti=6). this URL is the default image URL. It uses the **{{points}}** and **{{pointsEarnedToday}}** variables upfront. However you can also construct your own point badge image using any handlebars token defnied here. More info how to create point badge images [here](point-badge.md) 
E.g. 
```
https://epoints.savesoil.cc/point-badge?point={{pointsEarnedToday}}&total={{points}}&theme=blue_bottom&confetti=7
```

## An Example Full E-Mail Template

```html
<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office"
    style="font-family:'merriweather sans', 'helvetica neue', helvetica, arial, sans-serif">

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    <title>Save Soil: Any guess how many Earth Points you gained today 🙂</title>
    <!--[if (mso 16)]>
<style type="text/css">
a {text-decoration: none;}
</style>
<![endif]-->
    <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
    <!--[if gte mso 9]>
<xml>
<o:OfficeDocumentSettings>
<o:AllowPNG></o:AllowPNG>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
<![endif]-->
    <!--[if !mso]><!-- -->
    <link href="https://fonts.googleapis.com/css?family=Merriweather:400,400i,700,700i" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Merriweather+Sans:400,400i,700,700i" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i" rel="stylesheet">
    <!--<![endif]-->
    <style type="text/css">
        #outlook a {
            padding: 0;
        }

        .es-button {
            mso-style-priority: 100 !important;
            text-decoration: none !important;
        }

        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }

        .es-desk-hidden {
            display: none;
            float: left;
            overflow: hidden;
            width: 0;
            max-height: 0;
            line-height: 0;
            mso-hide: all;
        }

        [data-ogsb] .es-button {
            border-width: 0 !important;
            padding: 10px 20px 10px 20px !important;
        }

        [data-ogsb] .es-button.es-button-1 {
            padding: 5px 15px !important;
        }

        [data-ogsb] .es-button.es-button-2 {
            padding: 5px 20px !important;
        }

        @media only screen and (max-width:600px) {

            p,
            ul li,
            ol li,
            a {
                line-height: 150% !important
            }

            h1,
            h2,
            h3,
            h1 a,
            h2 a,
            h3 a {
                line-height: 120% !important
            }

            h1 {
                font-size: 30px !important;
                text-align: center
            }

            h2 {
                font-size: 20px !important;
                text-align: center
            }

            h3 {
                font-size: 20px !important;
                text-align: center
            }

            .es-header-body h1 a,
            .es-content-body h1 a,
            .es-footer-body h1 a {
                font-size: 30px !important
            }

            .es-header-body h2 a,
            .es-content-body h2 a,
            .es-footer-body h2 a {
                font-size: 20px !important;
                text-align: center
            }

            .es-header-body h3 a,
            .es-content-body h3 a,
            .es-footer-body h3 a {
                font-size: 20px !important
            }

            .es-menu td a {
                font-size: 16px !important
            }

            .es-header-body p,
            .es-header-body ul li,
            .es-header-body ol li,
            .es-header-body a {
                font-size: 16px !important
            }

            .es-content-body p,
            .es-content-body ul li,
            .es-content-body ol li,
            .es-content-body a {
                font-size: 16px !important
            }

            .es-footer-body p,
            .es-footer-body ul li,
            .es-footer-body ol li,
            .es-footer-body a {
                font-size: 16px !important
            }

            .es-infoblock p,
            .es-infoblock ul li,
            .es-infoblock ol li,
            .es-infoblock a {
                font-size: 12px !important
            }

            *[class="gmail-fix"] {
                display: none !important
            }

            .es-m-txt-c,
            .es-m-txt-c h1,
            .es-m-txt-c h2,
            .es-m-txt-c h3 {
                text-align: center !important
            }

            .es-m-txt-r,
            .es-m-txt-r h1,
            .es-m-txt-r h2,
            .es-m-txt-r h3 {
                text-align: right !important
            }

            .es-m-txt-l,
            .es-m-txt-l h1,
            .es-m-txt-l h2,
            .es-m-txt-l h3 {
                text-align: left !important
            }

            .es-m-txt-r img,
            .es-m-txt-c img,
            .es-m-txt-l img {
                display: inline !important
            }

            .es-button-border {
                display: block !important
            }

            a.es-button,
            button.es-button {
                font-size: 18px !important;
                display: block !important;
                border-left-width: 0px !important;
                border-right-width: 0px !important
            }

            .es-adaptive table,
            .es-left,
            .es-right {
                width: 100% !important
            }

            .es-content table,
            .es-header table,
            .es-footer table,
            .es-content,
            .es-footer,
            .es-header {
                width: 100% !important;
                max-width: 600px !important
            }

            .es-adapt-td {
                display: block !important;
                width: 100% !important
            }

            .adapt-img {
                width: 100% !important;
                height: auto !important
            }

            .es-m-p0 {
                padding: 0 !important
            }

            .es-m-p0r {
                padding-right: 0 !important
            }

            .es-m-p0l {
                padding-left: 0 !important
            }

            .es-m-p0t {
                padding-top: 0 !important
            }

            .es-m-p0b {
                padding-bottom: 0 !important
            }

            .es-m-p20b {
                padding-bottom: 20px !important
            }

            .es-mobile-hidden,
            .es-hidden {
                display: none !important
            }

            tr.es-desk-hidden,
            td.es-desk-hidden,
            table.es-desk-hidden {
                width: auto !important;
                overflow: visible !important;
                float: none !important;
                max-height: inherit !important;
                line-height: inherit !important
            }

            tr.es-desk-hidden {
                display: table-row !important
            }

            table.es-desk-hidden {
                display: table !important
            }

            td.es-desk-menu-hidden {
                display: table-cell !important
            }

            .es-menu td {
                width: 1% !important
            }

            table.es-table-not-adapt,
            .esd-block-html table {
                width: auto !important
            }

            table.es-social {
                display: inline-block !important
            }

            table.es-social td {
                display: inline-block !important
            }

            .es-m-p5 {
                padding: 5px !important
            }

            .es-m-p5t {
                padding-top: 5px !important
            }

            .es-m-p5b {
                padding-bottom: 5px !important
            }

            .es-m-p5r {
                padding-right: 5px !important
            }

            .es-m-p5l {
                padding-left: 5px !important
            }

            .es-m-p10 {
                padding: 10px !important
            }

            .es-m-p10t {
                padding-top: 10px !important
            }

            .es-m-p10b {
                padding-bottom: 10px !important
            }

            .es-m-p10r {
                padding-right: 10px !important
            }

            .es-m-p10l {
                padding-left: 10px !important
            }

            .es-m-p15 {
                padding: 15px !important
            }

            .es-m-p15t {
                padding-top: 15px !important
            }

            .es-m-p15b {
                padding-bottom: 15px !important
            }

            .es-m-p15r {
                padding-right: 15px !important
            }

            .es-m-p15l {
                padding-left: 15px !important
            }

            .es-m-p20 {
                padding: 20px !important
            }

            .es-m-p20t {
                padding-top: 20px !important
            }

            .es-m-p20r {
                padding-right: 20px !important
            }

            .es-m-p20l {
                padding-left: 20px !important
            }

            .es-m-p25 {
                padding: 25px !important
            }

            .es-m-p25t {
                padding-top: 25px !important
            }

            .es-m-p25b {
                padding-bottom: 25px !important
            }

            .es-m-p25r {
                padding-right: 25px !important
            }

            .es-m-p25l {
                padding-left: 25px !important
            }

            .es-m-p30 {
                padding: 30px !important
            }

            .es-m-p30t {
                padding-top: 30px !important
            }

            .es-m-p30b {
                padding-bottom: 30px !important
            }

            .es-m-p30r {
                padding-right: 30px !important
            }

            .es-m-p30l {
                padding-left: 30px !important
            }

            .es-m-p35 {
                padding: 35px !important
            }

            .es-m-p35t {
                padding-top: 35px !important
            }

            .es-m-p35b {
                padding-bottom: 35px !important
            }

            .es-m-p35r {
                padding-right: 35px !important
            }

            .es-m-p35l {
                padding-left: 35px !important
            }

            .es-m-p40 {
                padding: 40px !important
            }

            .es-m-p40t {
                padding-top: 40px !important
            }

            .es-m-p40b {
                padding-bottom: 40px !important
            }

            .es-m-p40r {
                padding-right: 40px !important
            }

            .es-m-p40l {
                padding-left: 40px !important
            }
        }
    </style>
</head>

<body
    style="width:100%;font-family:'merriweather sans', 'helvetica neue', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
    <span
        style="display:none !important;font-size:0px;line-height:0;color:#ffffff;visibility:hidden;opacity:0;height:0;width:0;mso-hide:all">&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌</span>
    <div class="es-wrapper-color" style="background-color:#F6F6F6">
        <!--[if gte mso 9]>
<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
<v:fill type="tile" color="#f6f6f6"></v:fill>
</v:background>
<![endif]-->
        <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0"
            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top">
            <tr>
                <td valign="top" style="padding:0;Margin:0">
                    <table cellpadding="0" cellspacing="0" class="es-content" align="center"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                        <tr>
                            <td align="center" style="padding:0;Margin:0">
                                <table bgcolor="#f9f1e8" class="es-content-body" align="center" cellpadding="0"
                                    cellspacing="0"
                                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#f9f1e8;width:600px">
                                    <tr>
                                        <td align="left"
                                            style="padding:0;Margin:0;background-image:url(https://ptpbhc.stripocdn.email/content/guids/CABINET_a8b5ef6bb8e65f1f5889425d63304f0a/images/rectangle_21_PEg.png);background-repeat:repeat;background-position:center top"
                                            background="https://ptpbhc.stripocdn.email/content/guids/CABINET_a8b5ef6bb8e65f1f5889425d63304f0a/images/rectangle_21_PEg.png">
                                            <table cellpadding="0" cellspacing="0" width="100%"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                <tr>
                                                    <td align="center" valign="top"
                                                        style="padding:0;Margin:0;width:600px">
                                                        <table cellpadding="0" cellspacing="0" width="100%"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr>
                                                                <td align="right"
                                                                    style="padding:0;Margin:0;padding-right:10px">
                                                                    <p
                                                                        style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'merriweather sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#ffffff;font-size:14px">
                                                                        <a target="_blank"
                                                                            style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#cccccc;font-size:14px;font-family:-apple-system, blinkmacsystemfont, 'segoe ui', roboto, helvetica, arial, sans-serif, 'apple color emoji', 'segoe ui emoji', 'segoe ui symbol'"
                                                                            href="https://view_mailer">Can't view
                                                                            Email?</a></p>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    <table cellpadding="0" cellspacing="0" class="es-content" align="center"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                        <tr>
                            <td align="center" style="padding:0;Margin:0">
                                <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0"
                                    cellspacing="0"
                                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#ffffff;background-repeat:no-repeat;width:600px;background-image:url(https://ptpbhc.stripocdn.email/content/guids/CABINET_0bcbc78ed7b6fadb394811fc3acd6565/images/image_157_kxw.png);background-position:left top"
                                    background="https://ptpbhc.stripocdn.email/content/guids/CABINET_0bcbc78ed7b6fadb394811fc3acd6565/images/image_157_kxw.png">
                                    <tr>
                                        <td align="left" style="padding:0;Margin:0">
                                            <table cellpadding="0" cellspacing="0" width="100%"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                <tr>
                                                    <td align="center" valign="top"
                                                        style="padding:0;Margin:0;width:600px">
                                                        <table cellpadding="0" cellspacing="0" width="100%"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr>
                                                                <td align="center"
                                                                    style="padding:0;Margin:0;font-size:0px"><a
                                                                        target="_blank"
                                                                        href="https://www.consciousplanet.org/"
                                                                        style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#1376C8;font-size:14px"><img
                                                                            class="adapt-img"
                                                                            src="https://ptpbhc.stripocdn.email/content/guids/CABINET_0bcbc78ed7b6fadb394811fc3acd6565/images/group_422.png"
                                                                            alt
                                                                            style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"
                                                                            width="600" height="233"></a></td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="padding:0;Margin:0">
                                            <table cellpadding="0" cellspacing="0" width="100%"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                <tr>
                                                    <td align="center" valign="top"
                                                        style="padding:0;Margin:0;width:600px">
                                                        <table cellpadding="0" cellspacing="0" width="100%"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr>
                                                                <td align="left"
                                                                    style="padding:0;Margin:0;padding-bottom:20px;padding-left:30px;padding-right:30px">
                                                                    <p
                                                                        style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px;text-align:center">
                                                                        Hello 👋&nbsp; {{firstName}},</p>
                                                                    <p
                                                                        style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px;text-align:center">
                                                                        <br></p>
                                                                    <p
                                                                        style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px;text-align:center">
                                                                        [Intro text] and have gained<strong> {{points}}
                                                                            Earth Points.</strong></p>
                                                                    <p
                                                                        style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'merriweather sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#333333;font-size:14px;display:none">
                                                                        <br></p>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left"
                                            style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px">
                                            <!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:300px" valign="top"><![endif]-->
                                            <table cellpadding="0" cellspacing="0" align="left" class="es-left"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                                                <tr class="es-mobile-hidden">
                                                    <td align="left" style="padding:0;Margin:0;width:300px">
                                                        <table cellpadding="0" cellspacing="0" width="100%"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr>
                                                                <td style="padding:0;Margin:0"><img
                                                                        src="https://epoints.savesoil.cc/point-badge?point={{pointsEarnedToday}}&amp;total={{points}}&amp;theme=blue_bottom&amp;confetti=7"
                                                                        style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"
                                                                        width="300"></td>
                                                            </tr>
                                                            <tr>
                                                                <td align="left" style="padding:0;Margin:0">
                                                                    <p
                                                                        style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'merriweather sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#333333;font-size:14px">
                                                                        <br></p>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                            <!--[if mso]></td><td style="width:15px"></td><td style="width:245px" valign="top"><![endif]-->
                                            <table cellpadding="0" cellspacing="0" class="es-right" align="right"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                                                <tr>
                                                    <td align="left" style="padding:0;Margin:0;width:245px">
                                                        <table cellpadding="0" cellspacing="0" width="100%"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr>
                                                                <td align="center" height="72"
                                                                    style="padding:0;Margin:0"></td>
                                                            </tr>
                                                            <tr>
                                                                <td align="center" class="es-m-txt-c es-m-p25t"
                                                                    style="padding:0;Margin:0">
                                                                    <p
                                                                        style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#09019f;font-size:16px">
                                                                        Share</p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td align="center" class="es-m-txt-c es-m-p0"
                                                                    style="padding:0;Margin:0;padding-bottom:10px;padding-left:10px;font-size:0">
                                                                    <table cellpadding="0" cellspacing="0"
                                                                        class="es-table-not-adapt es-social"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                        <tr>
                                                                            <td align="center" valign="top"
                                                                                style="padding:0;Margin:0;padding-right:40px">
                                                                                <a target="_blank"
                                                                                    href="https://twitter.com/intent/tweet?url={{#encodeURIComponent}}https://epoints.savesoil.cc/point-badge?point={{pointsEarnedToday}}&total={{points}}&theme=blue_bottom&confetti=7{{/encodeURIComponent}}%26share%3Dtwitter"
                                                                                    style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#1376C8;font-size:14px"><img
                                                                                        title="Twitter"
                                                                                        src="https://ptpbhc.stripocdn.email/content/guids/CABINET_78f3d3b63dbb81a6a41bfe2f73370a75/images/vector.png"
                                                                                        alt="Tw" height="32" width="37"
                                                                                        style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a>
                                                                            </td>
                                                                            <td align="center" valign="top"
                                                                                style="padding:0;Margin:0;padding-right:40px">
                                                                                <a target="_blank"
                                                                                    href="https://www.facebook.com/sharer/sharer.php?u={{#encodeURIComponent}}https://epoints.savesoil.cc/point-badge?point={{pointsEarnedToday}}&total={{points}}&theme=blue_bottom&confetti=7{{/encodeURIComponent}}%26share%3Dfacebook"
                                                                                    style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#1376C8;font-size:14px"><img
                                                                                        title="Facebook"
                                                                                        src="https://ptpbhc.stripocdn.email/content/guids/CABINET_78f3d3b63dbb81a6a41bfe2f73370a75/images/facebook_1.png"
                                                                                        alt="Fb" height="32" width="15"
                                                                                        style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a>
                                                                            </td>
                                                                            <td align="center" valign="top"
                                                                                style="padding:0;Margin:0"><a
                                                                                    target="_blank"
                                                                                    href="https://www.instagram.com/consciousplanet"
                                                                                    style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#1376C8;font-size:14px"><img
                                                                                        title="Instagram"
                                                                                        src="https://ptpbhc.stripocdn.email/content/guids/CABINET_78f3d3b63dbb81a6a41bfe2f73370a75/images/instagram_94A.png"
                                                                                        alt="Ig" height="32" width="30"
                                                                                        style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td align="center" height="76"
                                                                    style="padding:0;Margin:0"></td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                            <!--[if mso]></td></tr></table><![endif]-->
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="padding:0;Margin:0">
                                            <table cellpadding="0" cellspacing="0" width="100%"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                <tr>
                                                    <td align="center" valign="top"
                                                        style="padding:0;Margin:0;width:600px">
                                                        <table cellpadding="0" cellspacing="0" width="100%"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr>
                                                                <td align="center"
                                                                    style="padding:0;Margin:0;padding-top:30px;padding-left:30px;padding-right:30px">
                                                                    <p
                                                                        style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'merriweather sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:20px">
                                                                        <strong>TRENDING TODAY</strong></p>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left"
                                            style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px">
                                            <!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:280px" valign="top"><![endif]-->
                                            <table cellpadding="0" cellspacing="0" align="left" class="es-left"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                                                <tr>
                                                    <td align="center" valign="top"
                                                        style="padding:0;Margin:0;width:280px">
                                                        <table cellpadding="0" cellspacing="0" width="100%"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr>
                                                                <td style="padding:0;Margin:0">
                                                                    <table cellpadding="0" cellspacing="0" width="100%"
                                                                        class="es-menu"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                        <tr class="links-images-left">
                                                                            <td align="center" valign="top" width="100%"
                                                                                id="esd-menu-id-0"
                                                                                style="Margin:0;padding-left:5px;padding-right:5px;padding-top:10px;padding-bottom:10px;border:0">
                                                                                <a target="_blank" href=""
                                                                                    style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;display:block;font-family:'merriweather sans', 'helvetica neue', helvetica, arial, sans-serif;color:#333333;font-size:20px"><img
                                                                                        src="https://ptpbhc.stripocdn.email/content/guids/CABINET_0bcbc78ed7b6fadb394811fc3acd6565/images/newblackinstagramlogo202011609370162ayxbdxlffo_aIo.png"
                                                                                        alt="Instegram"
                                                                                        title="Instegram"
                                                                                        align="absmiddle" width="30"
                                                                                        height="31"
                                                                                        style="display:inline-block !important;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;padding-right:5px;vertical-align:middle">Instegram</a>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td align="center"
                                                                    style="padding:0;Margin:0;font-size:0px"><img
                                                                        class="adapt-img"
                                                                        src="https://ptpbhc.stripocdn.email/content/guids/CABINET_0bcbc78ed7b6fadb394811fc3acd6565/images/frame_367j.png"
                                                                        alt
                                                                        style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"
                                                                        width="270" height="170"></td>
                                                            </tr>
                                                            <tr>
                                                                <td align="center"
                                                                    style="padding:0;Margin:0;padding-top:5px;padding-left:5px">
                                                                    <span class="es-button-border"
                                                                        style="border-style:solid;border-color:#cccccc;background:#ffffff;border-width:0px 0px 2px 0px;display:inline-block;border-radius:6px;width:auto;border-top-width:2px;border-left-width:2px;border-right-width:2px"><a
                                                                            href="" class="es-button es-button-1"
                                                                            target="_blank"
                                                                            style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#6aa84f;font-size:16px;border-style:solid;border-color:#ffffff;border-width:10px 20px 10px 20px;display:inline-block;background:#ffffff;border-radius:6px;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;font-weight:normal;font-style:normal;line-height:19px;width:auto;text-align:center;border-top-width:5px;border-bottom-width:5px">
                                                                            <!--[if !mso]><!-- --><img
                                                                                src="https://ptpbhc.stripocdn.email/content/guids/CABINET_0bcbc78ed7b6fadb394811fc3acd6565/images/vector.png"
                                                                                alt="icon" width="16" align="absmiddle"
                                                                                style="display:inline-block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;vertical-align:middle;margin-right:10px"
                                                                                height="14">
                                                                            <!--<![endif]-->Share
                                                                        </a></span></td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                            <!--[if mso]></td><td style="width:0px"></td><td style="width:280px" valign="top"><![endif]-->
                                            <table cellpadding="0" cellspacing="0" class="es-right" align="right"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                                                <tr>
                                                    <td align="left" style="padding:0;Margin:0;width:280px">
                                                        <table cellpadding="0" cellspacing="0" width="100%"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr>
                                                                <td style="padding:0;Margin:0">
                                                                    <table cellpadding="0" cellspacing="0" width="100%"
                                                                        class="es-menu"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                        <tr class="links-images-left">
                                                                            <td align="center" valign="top" width="100%"
                                                                                id="esd-menu-id-0"
                                                                                style="Margin:0;padding-left:5px;padding-right:5px;padding-top:10px;padding-bottom:10px;border:0">
                                                                                <a target="_blank" href=""
                                                                                    style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;display:block;font-family:'merriweather sans', 'helvetica neue', helvetica, arial, sans-serif;color:#333333;font-size:20px"><img
                                                                                        src="https://ptpbhc.stripocdn.email/content/guids/CABINET_0bcbc78ed7b6fadb394811fc3acd6565/images/1011010824_connectwithusfacebooklogopnggreen_kER.png"
                                                                                        alt="Facebook" title="Facebook"
                                                                                        align="absmiddle" width="16"
                                                                                        height="30"
                                                                                        style="display:inline-block !important;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;padding-right:5px;vertical-align:middle">Facebook</a>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td align="center"
                                                                    style="padding:0;Margin:0;padding-bottom:10px;font-size:0px">
                                                                    <img class="adapt-img"
                                                                        src="https://ptpbhc.stripocdn.email/content/guids/CABINET_0bcbc78ed7b6fadb394811fc3acd6565/images/frame_367j.png"
                                                                        alt
                                                                        style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"
                                                                        width="270" height="170"></td>
                                                            </tr>
                                                            <tr>
                                                                <td align="center"
                                                                    style="padding:0;Margin:0;padding-top:5px;padding-left:5px">
                                                                    <span class="es-button-border"
                                                                        style="border-style:solid;border-color:#cccccc;background:#ffffff;border-width:0px 0px 2px 0px;display:inline-block;border-radius:6px;width:auto;border-top-width:2px;border-left-width:2px;border-right-width:2px"><a
                                                                            href="" class="es-button es-button-2"
                                                                            target="_blank"
                                                                            style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#6aa84f;font-size:16px;border-style:solid;border-color:#ffffff;border-width:5px 20px;display:inline-block;background:#ffffff;border-radius:6px;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;font-weight:normal;font-style:normal;line-height:19px;width:auto;text-align:center">
                                                                            <!--[if !mso]><!-- --><img
                                                                                src="https://ptpbhc.stripocdn.email/content/guids/CABINET_0bcbc78ed7b6fadb394811fc3acd6565/images/vector.png"
                                                                                alt="icon" width="16" align="absmiddle"
                                                                                style="display:inline-block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;vertical-align:middle;margin-right:10px"
                                                                                height="14">
                                                                            <!--<![endif]-->Share
                                                                        </a></span></td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                            <!--[if mso]></td></tr></table><![endif]-->
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left"
                                            style="padding:0;Margin:0;padding-bottom:20px;padding-top:30px">
                                            <!--[if mso]><table style="width:600px" cellpadding="0" cellspacing="0"><tr><td style="width:187px" valign="top"><![endif]-->
                                            <table cellpadding="0" cellspacing="0" class="es-left" align="left"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                                                <tr>
                                                    <td class="es-m-p20b" align="left"
                                                        style="padding:0;Margin:0;width:187px">
                                                        <table cellpadding="0" cellspacing="0" width="100%"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr>
                                                                <td style="padding:0;Margin:0">
                                                                    <table cellpadding="0" cellspacing="0" width="100%"
                                                                        class="es-menu"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                        <tr class="links-images-left">
                                                                            <td align="center" valign="top" width="100%"
                                                                                id="esd-menu-id-0"
                                                                                style="Margin:0;padding-left:5px;padding-right:5px;padding-top:10px;padding-bottom:10px;border:0">
                                                                                <a target="_blank" href=""
                                                                                    style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;display:block;font-family:'merriweather sans', 'helvetica neue', helvetica, arial, sans-serif;color:#333333;font-size:20px"><img
                                                                                        src="https://ptpbhc.stripocdn.email/content/guids/CABINET_0bcbc78ed7b6fadb394811fc3acd6565/images/twitterlogopngtransparentbackgroundgraphicfreeusetwitterlogoblack11562911265gfzrhbl86r.png"
                                                                                        alt="Twitter" title="Twitter"
                                                                                        align="absmiddle" width="30"
                                                                                        height="31"
                                                                                        style="display:inline-block !important;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;padding-right:5px;vertical-align:middle">Twitter</a>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td align="center"
                                                                    style="padding:0;Margin:0;padding-top:5px;padding-left:5px">
                                                                    <span class="es-button-border"
                                                                        style="border-style:solid;border-color:#cccccc;background:#ffffff;border-width:0px 0px 2px 0px;display:inline-block;border-radius:6px;width:auto;border-top-width:2px;border-left-width:2px;border-right-width:2px"><a
                                                                            href="" class="es-button es-button-1"
                                                                            target="_blank"
                                                                            style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#6aa84f;font-size:16px;border-style:solid;border-color:#ffffff;border-width:10px 20px 10px 20px;display:inline-block;background:#ffffff;border-radius:6px;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;font-weight:normal;font-style:normal;line-height:19px;width:auto;text-align:center;border-top-width:5px;border-bottom-width:5px">
                                                                            <!--[if !mso]><!-- --><img
                                                                                src="https://ptpbhc.stripocdn.email/content/guids/CABINET_0bcbc78ed7b6fadb394811fc3acd6565/images/vector.png"
                                                                                alt="icon" width="16" align="absmiddle"
                                                                                style="display:inline-block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;vertical-align:middle;margin-right:10px"
                                                                                height="14">
                                                                            <!--<![endif]-->Share
                                                                        </a></span></td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                            <!--[if mso]></td><td style="width:20px"></td><td style="width:393px" valign="top"><![endif]-->
                                            <table cellpadding="0" cellspacing="0" class="es-right" align="right"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                                                <tr>
                                                    <td align="left" style="padding:0;Margin:0;width:393px">
                                                        <table cellpadding="0" cellspacing="0" width="100%"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr>
                                                                <td align="left" class="es-m-txt-c es-m-p25r es-m-p25l"
                                                                    style="padding:0;Margin:0;padding-right:30px">
                                                                    <p
                                                                        style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px">
                                                                        Flowers, trees, and all the beauteous bounty of
                                                                        nature is rooted in the lushness of the soil.
                                                                        Healthy, rich soil is the basis for a beautiful
                                                                        life for all beings on the planet.&nbsp; Action
                                                                        Now:&nbsp;<a href="https://t.co/z6MmqMf5nE"
                                                                            target="_blank"
                                                                            style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#1376C8;font-size:14px">http://savesoil.org</a><a
                                                                            href="https://twitter.com/hashtag/SaveSoil?src=hashtag_click"
                                                                            style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#1376C8;font-size:14px">#SaveSoil</a><a
                                                                            href="https://twitter.com/hashtag/ConsciousPlanet?src=hashtag_click"
                                                                            style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#1376C8;font-size:14px">#ConsciousPlanet</a>
                                                                    </p>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                            <!--[if mso]></td></tr></table><![endif]-->
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="padding:0;Margin:0">
                                            <table cellpadding="0" cellspacing="0" width="100%"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                <tr>
                                                    <td align="center" valign="top"
                                                        style="padding:0;Margin:0;width:600px">
                                                        <table cellpadding="0" cellspacing="0" width="100%"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr>
                                                                <td align="center"
                                                                    style="padding:0;Margin:0;padding-top:30px;padding-left:30px;padding-right:30px">
                                                                    <p
                                                                        style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'merriweather sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:30px;color:#333333;font-size:20px">
                                                                        <strong><span>HAVE YOU WATCHED</span></strong>
                                                                    </p>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left"
                                            style="Margin:0;padding-bottom:5px;padding-top:10px;padding-left:30px;padding-right:30px">
                                            <!--[if mso]><table style="width:540px" cellpadding="0" cellspacing="0"><tr><td style="width:260px" valign="top"><![endif]-->
                                            <table cellpadding="0" cellspacing="0" align="left" class="es-left"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                                                <tr>
                                                    <td align="left" style="padding:0;Margin:0;width:260px">
                                                        <table cellpadding="0" cellspacing="0" width="100%"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr>
                                                                <td align="center"
                                                                    style="padding:0;Margin:0;font-size:0px"><img
                                                                        class="adapt-img"
                                                                        src="https://ptpbhc.stripocdn.email/content/guids/CABINET_0bcbc78ed7b6fadb394811fc3acd6565/images/frame_367j.png"
                                                                        alt
                                                                        style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"
                                                                        width="260" height="164"></td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                            <!--[if mso]></td><td style="width:20px"></td><td style="width:260px" valign="top"><![endif]-->
                                            <table cellpadding="0" cellspacing="0" class="es-right" align="right"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                                                <tr>
                                                    <td align="left" style="padding:0;Margin:0;width:260px">
                                                        <table cellpadding="0" cellspacing="0" width="100%"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr>
                                                                <td align="center" height="40"
                                                                    style="padding:0;Margin:0"></td>
                                                            </tr>
                                                            <tr>
                                                                <td align="left" style="padding:0;Margin:0">
                                                                    <p
                                                                        style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:32px;color:#333333;font-size:16px">
                                                                        <strong>[Video title]</strong><br>[Video
                                                                        description]</p>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                            <!--[if mso]></td></tr></table><![endif]-->
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="padding:0;Margin:0">
                                            <table cellpadding="0" cellspacing="0" width="100%"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                <tr>
                                                    <td align="center" valign="top"
                                                        style="padding:0;Margin:0;width:600px">
                                                        <table cellpadding="0" cellspacing="0" width="100%"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr>
                                                                <td align="center"
                                                                    style="padding:0;Margin:0;padding-top:30px;padding-left:30px;padding-right:30px">
                                                                    <p
                                                                        style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'merriweather sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:30px;color:#333333;font-size:20px">
                                                                        <strong>SAVE SOIL UPDATES</strong></p>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left"
                                            style="Margin:0;padding-bottom:5px;padding-top:10px;padding-left:30px;padding-right:30px">
                                            <!--[if mso]><table style="width:540px" cellpadding="0" cellspacing="0"><tr><td style="width:260px" valign="top"><![endif]-->
                                            <table cellpadding="0" cellspacing="0" align="left" class="es-left"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                                                <tr>
                                                    <td align="left" style="padding:0;Margin:0;width:260px">
                                                        <table cellpadding="0" cellspacing="0" width="100%"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr>
                                                                <td align="center"
                                                                    style="padding:0;Margin:0;font-size:0px"><img
                                                                        class="adapt-img"
                                                                        src="https://ptpbhc.stripocdn.email/content/guids/CABINET_0bcbc78ed7b6fadb394811fc3acd6565/images/frame_367j.png"
                                                                        alt
                                                                        style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"
                                                                        width="260" height="164"></td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                            <!--[if mso]></td><td style="width:20px"></td><td style="width:260px" valign="top"><![endif]-->
                                            <table cellpadding="0" cellspacing="0" class="es-right" align="right"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                                                <tr>
                                                    <td align="left" style="padding:0;Margin:0;width:260px">
                                                        <table cellpadding="0" cellspacing="0" width="100%"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr>
                                                                <td align="center" height="40"
                                                                    style="padding:0;Margin:0"></td>
                                                            </tr>
                                                            <tr>
                                                                <td align="left" style="padding:0;Margin:0">
                                                                    <p
                                                                        style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px">
                                                                        <strong><span
                                                                                style="white-space:nowrap">BIRMINGHAM,
                                                                                UK </span></strong><br><span
                                                                            style="white-space:nowrap">Sat, 19th March
                                                                            2022 </span><br><span
                                                                            style="white-space:nowrap">at 10:00 – 11:30
                                                                            GMT </span><br><span
                                                                            style="white-space:nowrap">University of
                                                                            Birmingham</span></p>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                            <!--[if mso]></td></tr></table><![endif]-->
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="padding:0;Margin:0">
                                            <table cellpadding="0" cellspacing="0" width="100%"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                <tr>
                                                    <td align="center" valign="top"
                                                        style="padding:0;Margin:0;width:600px">
                                                        <table cellpadding="0" cellspacing="0" width="100%"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr>
                                                                <td align="left" style="padding:20px;Margin:0">
                                                                    <p
                                                                        style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:merriweather, georgia, 'times new roman', serif;line-height:24px;color:#09019f;font-size:16px">
                                                                        <br></p>
                                                                    <p
                                                                        style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'merriweather sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px">
                                                                        With Joy,</p>
                                                                    <p
                                                                        style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'merriweather sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px">
                                                                        Save Soil Volunteers</p>
                                                                    <p
                                                                        style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'merriweather sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#333333;font-size:14px;display:none">
                                                                        <br></p>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    <table cellpadding="0" cellspacing="0" class="es-content" align="center"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                        <tr>
                            <td align="center" style="padding:0;Margin:0">
                                <table class="es-content-body" align="center" cellpadding="0" cellspacing="0"
                                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#11059e;background-repeat:no-repeat;background-size:cover;width:600px;background-image:url(https://ptpbhc.stripocdn.email/content/guids/CABINET_14cf1a8761a47eadb9f45661e7f8f9e0/images/rectangle_20_7IL.png);background-position:center top"
                                    background="https://ptpbhc.stripocdn.email/content/guids/CABINET_14cf1a8761a47eadb9f45661e7f8f9e0/images/rectangle_20_7IL.png"
                                    bgcolor="#11059E">
                                    <tr>
                                        <td align="left" style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px">
                                            <!--[if mso]><table style="width:600px" cellpadding="0" cellspacing="0"><tr><td style="width:156px" valign="top"><![endif]-->
                                            <table cellpadding="0" cellspacing="0" class="es-left" align="left"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                                                <tr>
                                                    <td class="es-m-p20b" align="center"
                                                        style="padding:0;Margin:0;width:156px">
                                                        <table cellpadding="0" cellspacing="0" width="100%"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr>
                                                                <td align="left" class="es-m-txt-c es-m-p0"
                                                                    style="padding:0;Margin:0;padding-bottom:5px;padding-top:10px;padding-left:30px">
                                                                    <p
                                                                        style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#ffffff;font-size:14px">
                                                                        <strong>&nbsp;Connect with us</strong></p>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                            <!--[if mso]></td><td style="width:0px"></td><td style="width:444px" valign="top"><![endif]-->
                                            <table cellpadding="0" cellspacing="0" class="es-right" align="right"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                                                <tr>
                                                    <td align="center" style="padding:0;Margin:0;width:444px">
                                                        <table cellpadding="0" cellspacing="0" width="100%"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr>
                                                                <td align="left" class="es-m-txt-c es-m-p0"
                                                                    style="Margin:0;padding-top:5px;padding-bottom:5px;padding-right:5px;padding-left:35px;font-size:0">
                                                                    <table cellpadding="0" cellspacing="0"
                                                                        class="es-table-not-adapt es-social"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                        <tr>
                                                                            <td align="center" valign="top"
                                                                                style="padding:0;Margin:0;padding-right:5px">
                                                                                <a target="_blank"
                                                                                    href="https://www.facebook.com/consciousplanetmovement"
                                                                                    style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#1376C8;font-size:14px"><img
                                                                                        title="Facebook"
                                                                                        src="https://ptpbhc.stripocdn.email/content/assets/img/social-icons/logo-white/facebook-logo-white.png"
                                                                                        alt="Fb" width="32" height="32"
                                                                                        style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a>
                                                                            </td>
                                                                            <td align="center" valign="top"
                                                                                style="padding:0;Margin:0;padding-right:5px">
                                                                                <a target="_blank"
                                                                                    href="https://twitter.com/cpsavesoil"
                                                                                    style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#1376C8;font-size:14px"><img
                                                                                        title="Twitter"
                                                                                        src="https://ptpbhc.stripocdn.email/content/assets/img/social-icons/logo-white/twitter-logo-white.png"
                                                                                        alt="Tw" width="32" height="32"
                                                                                        style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a>
                                                                            </td>
                                                                            <td align="center" valign="top"
                                                                                style="padding:0;Margin:0;padding-right:5px">
                                                                                <a target="_blank"
                                                                                    href="https://www.instagram.com/consciousplanet"
                                                                                    style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#1376C8;font-size:14px"><img
                                                                                        title="Instagram"
                                                                                        src="https://ptpbhc.stripocdn.email/content/assets/img/social-icons/logo-white/instagram-logo-white.png"
                                                                                        alt="Inst" width="32"
                                                                                        height="32"
                                                                                        style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a>
                                                                            </td>
                                                                            <td align="center" valign="top"
                                                                                style="padding:0;Margin:0;padding-right:5px">
                                                                                <a target="_blank"
                                                                                    href="https://www.youtube.com/watch?v=hyT-6qiubd0"
                                                                                    style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#1376C8;font-size:14px"><img
                                                                                        title="Youtube"
                                                                                        src="https://ptpbhc.stripocdn.email/content/assets/img/social-icons/logo-white/youtube-logo-white.png"
                                                                                        alt="Yt" width="32" height="32"
                                                                                        style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a>
                                                                            </td>
                                                                            <td align="center" valign="top"
                                                                                style="padding:0;Margin:0"><a
                                                                                    target="_blank"
                                                                                    href="https://www.consciousplanet.org/"
                                                                                    style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#1376C8;font-size:14px"><img
                                                                                        title="World"
                                                                                        src="https://ptpbhc.stripocdn.email/content/assets/img/other-icons/logo-white/globe-logo-white.png"
                                                                                        alt="World" width="32"
                                                                                        height="32"
                                                                                        style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                            <!--[if mso]></td></tr></table><![endif]-->
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="es-m-p0" align="left"
                                            style="Margin:0;padding-top:10px;padding-left:10px;padding-bottom:15px;padding-right:25px">
                                            <!--[if mso]><table style="width:565px" cellpadding="0" cellspacing="0"><tr><td style="width:428px" valign="top"><![endif]-->
                                            <table cellpadding="0" cellspacing="0" align="left" class="es-left"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                                                <tr>
                                                    <td align="left" class="es-m-p20b"
                                                        style="padding:0;Margin:0;width:428px">
                                                        <table cellpadding="0" cellspacing="0" width="100%"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr>
                                                                <td align="left"
                                                                    class="es-m-p20t es-m-p20b es-m-p0l es-m-txt-c"
                                                                    style="padding:0;Margin:0;padding-left:25px">
                                                                    <p
                                                                        style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#ffffff;font-size:14px">
                                                                        Conscious Planet<br>725 Cool Springs
                                                                        Blvd<br>Suite 245 Franklin<br>TN 37067 USA</p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td align="left"
                                                                    class="es-m-txt-c es-m-p10t es-m-p15b es-m-p0l"
                                                                    style="padding:0;Margin:0;padding-top:5px;padding-left:25px">
                                                                    <p
                                                                        style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:18px;color:#ffffff;font-size:12px">
                                                                        <u><a target="_blank"
                                                                                style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#ffffff;font-size:12px;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif"
                                                                                href="http://cpsupport.ishayoga.eu/support/tickets/new">Contact
                                                                                Us</a></u> | <u><a target="_blank"
                                                                                style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#ffffff;font-size:12px;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif"
                                                                                href="https://www.consciousplanet.org/privacy-policy">Privacy</a></u>
                                                                        | <u><a target="_blank"
                                                                                style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#ffffff;font-size:12px;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif"
                                                                                href="unsubscribe_from_list">Unsubscribe</a></u>
                                                                        | <u><a target="_blank"
                                                                                style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#ffffff;font-size:12px;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;white-space:nowrap"
                                                                                href="manage_subscription">Manage Email
                                                                                Preferences</a></u></p>
                                                                </td>
                                                            </tr>
                                                            <!--[if !mso]><!-- -->
                                                            <!--<![endif]-->
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                            <!--[if mso]></td><td style="width:10px"></td><td style="width:127px" valign="top"><![endif]-->
                                            <table cellpadding="0" cellspacing="0" class="es-right" align="right"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                                                <tr>
                                                    <td align="left" style="padding:0;Margin:0;width:127px">
                                                        <table cellpadding="0" cellspacing="0" width="100%"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr>
                                                                <td align="center" class="es-m-p15"
                                                                    style="padding:0;Margin:0;padding-right:10px;font-size:0px">
                                                                    <a target="_blank"
                                                                        href="https://www.consciousplanet.org/"
                                                                        style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#1376C8;font-size:14px"><img
                                                                            src="https://ptpbhc.stripocdn.email/content/guids/CABINET_14cf1a8761a47eadb9f45661e7f8f9e0/images/save_soil_dp_logo.png"
                                                                            alt="savesoil.org"
                                                                            style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"
                                                                            width="117" title="savesoil.org"
                                                                            height="114"></a></td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                            <!--[if mso]></td></tr></table><![endif]-->
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
</body>

</html>
```
