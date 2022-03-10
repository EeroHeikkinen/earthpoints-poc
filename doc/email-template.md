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
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office"
  style="font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif">

<head>
  <meta http-equiv="Content-Security-Policy"
    content="script-src 'none'; connect-src 'none'; object-src 'none'; form-action 'none';">
  <meta content="width=device-width, initial-scale=1" name="viewport">
  <meta charset="UTF-8">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta content="telephone=no" name="format-detection">
  <title>You gained Save Soil Earth Points</title>
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
        line-height: 120%
      }

      h1 {
        font-size: 22px !important;
        text-align: left
      }

      h2 {
        font-size: 20px !important;
        text-align: left
      }

      h3 {
        font-size: 18px !important;
        text-align: left
      }

      .es-header-body h1 a,
      .es-content-body h1 a,
      .es-footer-body h1 a {
        font-size: 22px !important;
        text-align: left
      }

      .es-header-body h2 a,
      .es-content-body h2 a,
      .es-footer-body h2 a {
        font-size: 20px !important;
        text-align: left
      }

      .es-header-body h3 a,
      .es-content-body h3 a,
      .es-footer-body h3 a {
        font-size: 18px !important;
        text-align: left
      }

      .es-menu td a {
        font-size: 14px !important
      }

      .es-header-body p,
      .es-header-body ul li,
      .es-header-body ol li,
      .es-header-body a {
        font-size: 14px !important
      }

      .es-content-body p,
      .es-content-body ul li,
      .es-content-body ol li,
      .es-content-body a {
        font-size: 14px !important
      }

      .es-footer-body p,
      .es-footer-body ul li,
      .es-footer-body ol li,
      .es-footer-body a {
        font-size: 14px !important
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
        display: inline-block !important
      }

      a.es-button,
      button.es-button {
        font-size: 18px !important;
        display: inline-block !important
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
  <link href="https://viewstripo.email/assets/css/dev-custom-scroll.css" rel="stylesheet" type="text/css">
  <base href="#">
</head>

<body
  style="width:100%;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
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
      <tbody>
        <tr>
          <td valign="top" style="padding:0;Margin:0">
            <table class="es-header" cellspacing="0" cellpadding="0" align="center"
              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
              <tbody>
                <tr>
                  <td align="center" style="padding:0;Margin:0">
                    <table class="es-content-body" align="center" cellpadding="0" cellspacing="0"
                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px"
                      bgcolor="#ece7e0">
                      <tbody>
                        <tr>
                          <td align="left"
                            style="padding:0;Margin:0;padding-left:20px;padding-right:20px;background-color:#071398"
                            bgcolor="#071398">
                            <table cellpadding="0" cellspacing="0" width="100%"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                              <tbody>
                                <tr>
                                  <td
                                    style="Margin:0;line-height:14px;padding-top:10px;padding-right:0px;padding-bottom:10px;padding-left:0px">
                                    <div
                                      style="font-size:12px;line-height:14px;font-family:'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif">
                                      <p
                                        style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:16px;color:#333333;font-size:14px;text-align:right;margin:0">
                                        <a href="view_mailer" rel="noopener"
                                          style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#ffffff;font-size:14px"
                                          target="_blank">Can't see this Email? View Online</a></p>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="es-content" cellspacing="0" cellpadding="0" align="center"
              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
              <tbody>
                <tr>
                  <td align="center" style="padding:0;Margin:0">
                    <table class="es-header-body" cellspacing="0" cellpadding="0" align="center"
                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#fffbfa;width:600px"
                      bgcolor="#fffbfa">
                      <tbody>
                        <tr>
                          <td align="left" style="padding:0;Margin:0">
                            <table cellspacing="0" cellpadding="0" width="100%"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                              <tbody>
                                <tr>
                                  <td class="es-m-p0r es-m-p20b" valign="top" align="center"
                                    style="padding:0;Margin:0;width:600px">
                                    <table width="100%" cellspacing="0" cellpadding="0" role="presentation"
                                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                      <tbody>
                                        <tr>
                                          <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank"
                                              href="https://www.consciousplanet.org/"
                                              style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#2CB543;font-size:14px"><img
                                                class="adapt-img"
                                                src="https://ptpbhc.stripocdn.email/content/guids/CABINET_14cf1a8761a47eadb9f45661e7f8f9e0/images/banner.png"
                                                alt=""
                                                style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"
                                                width="600"></a></td>
                                        </tr>
                                        <tr>
                                          <td align="left"
                                            style="padding:0;Margin:0;padding-right:20px;padding-left:25px">


<p
	style="margin: 0; font-size: 16px; mso-line-height-alt: 24px;">
	<span style="font-size:16px;">Dear
		{{firstName}},</span></p>
<p></p>
<p
	style="margin: 0; font-size: 16px; mso-line-height-alt: 21px;">
	 </p>
<p
	style="margin: 0; font-size: 16px; mso-line-height-alt: 24px;">
	<span style="font-size:16px;">You have {{points}} Earth Points!</span></p>




                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table cellpadding="0" cellspacing="0" class="es-content" align="center"
              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
              <tbody>
                <tr>
                  <td align="center" style="padding:0;Margin:0">
                    <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ece7e0" align="center"
                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#ece7e0;background-repeat:no-repeat;width:600px;background-image:url(https://ptpbhc.stripocdn.email/content/guids/CABINET_14cf1a8761a47eadb9f45661e7f8f9e0/images/handsbgrd_1_SLl.png);background-position:left top"
                      background="https://ptpbhc.stripocdn.email/content/guids/CABINET_14cf1a8761a47eadb9f45661e7f8f9e0/images/handsbgrd_1_SLl.png">
                      <tbody>
                        <tr>
                          <td align="left" style="padding:20px;Margin:0;border-radius:15px 15px 20px 20px">
                            <!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:270px" valign="top"><![endif]-->
                            <table cellpadding="0" cellspacing="0" align="left" class="es-left"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                              <tbody>
                                <tr>
                                  <td align="left" class="es-m-p20b" style="padding:0;Margin:0;width:270px">
                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                      <tbody>
                                        <tr>
                                          <td align="center" style="padding:0;Margin:0;font-size:0px">
                                            {{#if footerImage}}
                                            <img
                                              src="{{footerImage}}"
                                              alt=""
                                              style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"
                                              width="212"></td>
                                            {{/if}}
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <!--[if mso]></td><td style="width:20px"></td><td style="width:270px" valign="top"><![endif]-->
                            <table cellpadding="0" cellspacing="0" class="es-right" align="right"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                              <tbody>
                                <tr>
                                  <td align="left" style="padding:0;Margin:0;width:270px">
                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                      <tbody>
                                        <tr>
                                          <td align="left"
                                            style="Margin:0;padding-bottom:10px;padding-top:20px;padding-left:20px;padding-right:20px;border-radius:20px 20px 0px 0px">
                                            <p
                                              style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#000000;font-size:16px">
                                              <b>Share</b></p>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td style="padding:0;Margin:0">
                                            <table cellpadding="0" cellspacing="0" width="100%" class="es-menu"
                                              role="presentation"
                                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                              <tbody>
                                                <tr class="images">
                                                  <td align="center" valign="top" width="33.33%" bgcolor="transparent"
                                                    style="Margin:0;padding-left:5px;padding-right:5px;padding-top:30px;padding-bottom:20px;border:0;border-radius:0px 0px 0px 20px"
                                                    id="esd-menu-id-0"><a target="_blank"
                                                      href="https://twitter.com/cpsavesoil"
                                                      style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;display:block;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;color:#2CB543;font-size:14px"><img
                                                        src="https://ptpbhc.stripocdn.email/content/guids/CABINET_14cf1a8761a47eadb9f45661e7f8f9e0/images/whitetwitterlogovectorstencilanimalbirdsilhouettetransparentpng173007.png"
                                                        alt="Item1" title="Item1" height="39"
                                                        style="display:inline-block !important;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;vertical-align:middle"></a>
                                                  </td>
                                                  <td align="center" valign="top" width="33.33%" bgcolor="transparent"
                                                    style="Margin:0;padding-left:5px;padding-right:5px;padding-top:30px;padding-bottom:20px;border:0"
                                                    id="esd-menu-id-1"><a target="_blank"
                                                      href="https://www.facebook.com/consciousplanetmovement"
                                                      style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;display:block;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;color:#2CB543;font-size:14px"><img
                                                        src="https://ptpbhc.stripocdn.email/content/guids/CABINET_14cf1a8761a47eadb9f45661e7f8f9e0/images/facebooklogowhitewhiteffacebooklogosymboltrademarkcrosstexttransparentpng1141531_1.png"
                                                        alt="Item2" title="Item2" height="39"
                                                        style="display:inline-block !important;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;vertical-align:middle"></a>
                                                  </td>
                                                  <td align="center" valign="top" width="33.33%" bgcolor="transparent"
                                                    style="Margin:0;padding-left:5px;padding-right:5px;padding-top:30px;padding-bottom:20px;border:0;border-radius:0px 0px 20px"
                                                    id="esd-menu-id-2"><a target="_blank"
                                                      href="https://www.instagram.com/consciousplanet"
                                                      style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;display:block;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;color:#2CB543;font-size:14px"><img
                                                        src="https://ptpbhc.stripocdn.email/content/guids/CABINET_14cf1a8761a47eadb9f45661e7f8f9e0/images/instagramiconwhite6whitebackgroundinstagramlogodryerappliancesymboltexttransparentp.png"
                                                        alt="Item3" title="Item3" height="39"
                                                        style="display:inline-block !important;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;vertical-align:middle"></a>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td align="left" style="padding:0;Margin:0">
                                            <p
                                              style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#333333;font-size:14px">
                                              <em>Find Save Soil in your local language <a target="_blank"
                                                  href="https://kit.savesoil.eu/#333590c0c29740b6918313661933d6c3"
                                                  style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#2CB543;font-size:14px">here</a></em>
                                            </p>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <!--[if mso]></td></tr></table><![endif]-->
                          </td>
                        </tr>
                        <tr>
                          <td align="left" style="padding:0;Margin:0;padding-left:20px;padding-right:20px">
                            <table width="100%" cellspacing="0" cellpadding="0"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                              <tbody>
                                <tr>
                                  <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
                                    <table width="100%" cellspacing="0" cellpadding="0" role="presentation"
                                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                      <tbody>
                                        <tr>
                                          <td align="left" style="padding:0;Margin:0;padding-bottom:10px">
                                            <p
                                              style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'merriweather sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px">
                                              <strong>Your support in creating awareness for Soil is
                                                invaluable.</strong></p><br>
                                            <p
                                              style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'merriweather sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px">
                                              <strong>Every action you take</strong> - be it a post or a tweet, sharing
                                              or liking content on social media, <strong>each friend who joins the
                                                movement</strong> through <a target="_blank"
                                                style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#2CB543;font-size:16px;font-family:'merriweather sans', 'helvetica neue', helvetica, arial, sans-serif"
                                                href="">your personal page</a>, goes a long way in spreading the word!
                                              The success of this movement depends on these small actions that all of us
                                              are taking.</p><br>
                                            <p
                                              style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'merriweather sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px">
                                              The danger of soil extinction is grave and we are all committed to raise
                                              awareness for the cause. Still, <strong>to keep it fun</strong> we want to
                                              acknowledge each action you take to spread the word with <a
                                                target="_blank"
                                                style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#2CB543;font-size:16px;font-family:'merriweather sans', 'helvetica neue', helvetica, arial, sans-serif"
                                                href="">Earth Points</a>. You get Earth badges 🎖🏆 when you reach
                                              specific Earth Points which you’d be able to flaunt&nbsp;😊 and inspire
                                              others. We are also working with partners so you can use your Earth Points
                                              to plant trees 🌳🌲🌴</p>
                                            <p
                                              style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'merriweather sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px">
                                              <br></p>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td align="center" style="padding:0;Margin:0"><span class="es-button-border"
                                              style="border-style:solid;border-color:#2cb543;background:#0211b4;border-width:0px;display:inline-block;border-radius:5px;width:auto"><a
                                                href="" class="es-button" target="_blank"
                                                style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FFFFFF;font-size:18px;border-style:solid;border-color:#0211b4;border-width:10px 20px 10px 20px;display:inline-block;background:#0211b4;border-radius:5px;font-family:'merriweather sans', 'helvetica neue', helvetica, arial, sans-serif;font-weight:normal;font-style:normal;line-height:22px;width:auto;text-align:center">Continue
                                                earning Earth Points</a></span></td>
                                        </tr>
                                        <tr>
                                          <td align="center" style="padding:0;Margin:0;padding-top:15px;font-size:0px">
                                            <img
                                              src="https://ptpbhc.stripocdn.email/content/guids/CABINET_a226c4006b564898ee429d3f75774e1d/images/18_tot_Mq1.png"
                                              alt=""
                                              style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"
                                              height="51"></td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td align="left"
                            style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px">
                            <table width="100%" cellspacing="0" cellpadding="0"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                              <tbody>
                                <tr>
                                  <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
                                    <table width="100%" cellspacing="0" cellpadding="0" role="presentation"
                                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                      <tbody>
                                        <tr>
                                          <td align="left" style="padding:0;Margin:0;padding-bottom:10px">
                                            <p
                                              style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'merriweather sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px">
                                              Looking forward to creating healthy soil policies in each nation. What we
                                              do together for soil awareness in the <strong>next 100 days</strong>
                                              impacts ensuring a happy, nutritious future for everyone.</p><br>
                                            <p
                                              style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'merriweather sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px">
                                              With Joy</p>
                                            <p
                                              style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'merriweather sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px">
                                              Save Soil Volunteers<br><br>P.S.:&nbsp;Check out your Earth Points
                                              Dashboard<br></p>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td align="center"
                                            style="padding:0;Margin:0;padding-bottom:15px;font-size:0px"><img
                                              src="https://ptpbhc.stripocdn.email/content/guids/CABINET_a226c4006b564898ee429d3f75774e1d/images/18_tot_Mq1.png"
                                              alt=""
                                              style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"
                                              height="51"></td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table cellpadding="0" cellspacing="0" class="es-footer" align="center"
              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
              <tbody>
                <tr>
                  <td align="center" style="padding:0;Margin:0">
                    <table class="es-footer-body" cellspacing="0" cellpadding="0" align="center"
                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;background-repeat:no-repeat;width:600px;background-image:url(https://ptpbhc.stripocdn.email/content/guids/CABINET_14cf1a8761a47eadb9f45661e7f8f9e0/images/rectangle_20_H71.png);background-position:left top"
                      background="https://ptpbhc.stripocdn.email/content/guids/CABINET_14cf1a8761a47eadb9f45661e7f8f9e0/images/rectangle_20_H71.png">
                      <!--[if !mso]><!-- -->
                      <tbody>
                        <tr class="es-desk-hidden"
                          style="display:none;float:left;overflow:hidden;width:0;max-height:0;line-height:0;mso-hide:all">
                          <td align="left" style="padding:0;Margin:0;padding-top:10px">
                            <table cellpadding="0" cellspacing="0" class="es-left" align="left"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                              <tbody>
                                <tr>
                                  <td class="es-m-p20b" align="center" style="padding:0;Margin:0;width:401px">
                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                      <tbody>
                                        <tr>
                                          <td align="center" style="padding:0;Margin:0;padding-top:5px">
                                            <p
                                              style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#ffffff;font-size:14px">
                                              <strong>Connect with us</strong></p>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table cellpadding="0" cellspacing="0" class="es-right" align="right"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                              <tbody>
                                <tr>
                                  <td align="center" style="padding:0;Margin:0;width:199px">
                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                      <tbody>
                                        <tr>
                                          <td align="center" style="padding:0;Margin:0;padding-bottom:5px;font-size:0">
                                            <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social"
                                              role="presentation"
                                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                              <tbody>
                                                <tr>
                                                  <td align="center" valign="top" style="padding:0;Margin:0"><a
                                                      target="_blank"
                                                      href="https://www.facebook.com/consciousplanetmovement"
                                                      style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#FFFFFF;font-size:14px"><img
                                                        title="Facebook"
                                                        src="https://ptpbhc.stripocdn.email/content/assets/img/social-icons/logo-white/facebook-logo-white.png"
                                                        alt="Fb" width="32"
                                                        style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a>
                                                  </td>
                                                  <td align="center" valign="top" style="padding:0;Margin:0"><a
                                                      target="_blank" href="https://twitter.com/cpsavesoil"
                                                      style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#FFFFFF;font-size:14px"><img
                                                        title="Twitter"
                                                        src="https://ptpbhc.stripocdn.email/content/assets/img/social-icons/logo-white/twitter-logo-white.png"
                                                        alt="Tw" width="32"
                                                        style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a>
                                                  </td>
                                                  <td align="center" valign="top" style="padding:0;Margin:0"><a
                                                      target="_blank" href="https://www.instagram.com/consciousplanet"
                                                      style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#FFFFFF;font-size:14px"><img
                                                        title="Instagram"
                                                        src="https://ptpbhc.stripocdn.email/content/assets/img/social-icons/logo-white/instagram-logo-white.png"
                                                        alt="Inst" width="32"
                                                        style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a>
                                                  </td>
                                                  <td align="center" valign="top" style="padding:0;Margin:0"><a
                                                      target="_blank" href="https://www.youtube.com/watch?v=hyT-6qiubd0"
                                                      style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#FFFFFF;font-size:14px"><img
                                                        title="Youtube"
                                                        src="https://ptpbhc.stripocdn.email/content/assets/img/social-icons/logo-white/youtube-logo-white.png"
                                                        alt="Yt" width="32"
                                                        style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a>
                                                  </td>
                                                  <td align="center" valign="top" style="padding:0;Margin:0"><a
                                                      target="_blank" href="https://www.consciousplanet.org/"
                                                      style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#FFFFFF;font-size:14px"><img
                                                        title="World"
                                                        src="https://ptpbhc.stripocdn.email/content/assets/img/other-icons/logo-white/globe-logo-white.png"
                                                        alt="World" width="32"
                                                        style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <!--<![endif]-->
                        <!--[if !mso]><!-- -->
                        <tr class="es-desk-hidden"
                          style="display:none;float:left;overflow:hidden;width:0;max-height:0;line-height:0;mso-hide:all">
                          <td class="es-m-p5r es-m-p5l" align="left"
                            style="Margin:0;padding-left:10px;padding-right:10px;padding-top:15px;padding-bottom:15px">
                            <table cellpadding="0" cellspacing="0" width="100%"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                              <tbody>
                                <tr>
                                  <td align="left" style="padding:0;Margin:0;width:580px">
                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                      <tbody>
                                        <tr>
                                          <td align="center" class="es-m-p5r es-m-p5l"
                                            style="padding:0;Margin:0;padding-bottom:5px;font-size:0px"><a
                                              target="_blank" href="https://www.consciousplanet.org/"
                                              style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#FFFFFF;font-size:14px"><img
                                                src="https://ptpbhc.stripocdn.email/content/guids/CABINET_31296818a1d8346a184c05320f03d299/images/save_soil_dp_logo.png"
                                                alt="Isha"
                                                style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"
                                                width="117" title="Isha"></a></td>
                                        </tr>
                                        <tr>
                                          <td align="center" class="es-m-p5r es-m-p5l" style="padding:0;Margin:0">
                                            <p
                                              style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:18px;color:#ffffff;font-size:12px">
                                              Conscious Planet<br>725 Cool Springs Blvd<br>Suite 245
                                              Franklin<br>&nbsp;TN 37067 USA</p>
                                          </td>
                                        </tr>
                                        <tr class="es-desk-hidden"
                                          style="display:none;float:left;overflow:hidden;width:0;max-height:0;line-height:0;mso-hide:all">
                                          <td align="center" class="es-m-p5r es-m-p5l"
                                            style="padding:0;Margin:0;padding-top:5px">
                                            <p
                                              style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:15px;color:#ffffff;font-size:10px">
                                              <a target="_blank"
                                                style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#ffffff;font-size:10px;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;word-break:break-all"
                                                href="http://cpsupport.ishayoga.eu/support/tickets/new">Contact Us</a> |
                                              <a target="_blank"
                                                style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#ffffff;font-size:10px;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif"
                                                href="https://www.consciousplanet.org/privacy-policy">Privacy</a><br><a
                                                target="_blank"
                                                style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#ffffff;font-size:10px;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif"
                                                href="unsubscribe_from_list">Unsubscribe</a> | <a target="_blank"
                                                style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#ffffff;font-size:10px;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;white-space:nowrap"
                                                href="manage_subscription">Manage Email Preferences</a></p>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <!--<![endif]-->
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table cellpadding="0" cellspacing="0" class="es-content" align="center"
              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
              <tbody>
                <tr>
                  <td align="center" style="padding:0;Margin:0">
                    <table class="es-content-body" align="center" cellpadding="0" cellspacing="0"
                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;background-repeat:no-repeat;width:600px;background-image:url(https://ptpbhc.stripocdn.email/content/guids/CABINET_14cf1a8761a47eadb9f45661e7f8f9e0/images/rectangle_20_7IL.png);background-position:center top"
                      background="https://ptpbhc.stripocdn.email/content/guids/CABINET_14cf1a8761a47eadb9f45661e7f8f9e0/images/rectangle_20_7IL.png">
                      <tbody>
                        <tr class="es-mobile-hidden">
                          <td align="left" style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px">
                            <!--[if mso]><table style="width:600px" cellpadding="0" cellspacing="0"><tr><td style="width:156px" valign="top"><![endif]-->
                            <table cellpadding="0" cellspacing="0" class="es-left" align="left"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                              <tbody>
                                <tr>
                                  <td class="es-m-p20b" align="center" style="padding:0;Margin:0;width:156px">
                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                      <tbody>
                                        <tr>
                                          <td align="left"
                                            style="padding:0;Margin:0;padding-bottom:5px;padding-top:10px;padding-left:35px">
                                            <p
                                              style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#ffffff;font-size:14px">
                                              <strong>&nbsp;Connect with us</strong></p>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <!--[if mso]></td><td style="width:0px"></td><td style="width:444px" valign="top"><![endif]-->
                            <table cellpadding="0" cellspacing="0" class="es-right" align="right"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                              <tbody>
                                <tr>
                                  <td align="center" style="padding:0;Margin:0;width:444px">
                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                      <tbody>
                                        <tr>
                                          <td align="left"
                                            style="Margin:0;padding-top:5px;padding-bottom:5px;padding-right:5px;padding-left:35px;font-size:0">
                                            <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social"
                                              role="presentation"
                                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                              <tbody>
                                                <tr>
                                                  <td align="center" valign="top"
                                                    style="padding:0;Margin:0;padding-right:5px"><a target="_blank"
                                                      href="https://www.facebook.com/consciousplanetmovement"
                                                      style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#2CB543;font-size:14px"><img
                                                        title="Facebook"
                                                        src="https://ptpbhc.stripocdn.email/content/assets/img/social-icons/logo-white/facebook-logo-white.png"
                                                        alt="Fb" width="32"
                                                        style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a>
                                                  </td>
                                                  <td align="center" valign="top"
                                                    style="padding:0;Margin:0;padding-right:5px"><a target="_blank"
                                                      href="https://twitter.com/cpsavesoil"
                                                      style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#2CB543;font-size:14px"><img
                                                        title="Twitter"
                                                        src="https://ptpbhc.stripocdn.email/content/assets/img/social-icons/logo-white/twitter-logo-white.png"
                                                        alt="Tw" width="32"
                                                        style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a>
                                                  </td>
                                                  <td align="center" valign="top"
                                                    style="padding:0;Margin:0;padding-right:5px"><a target="_blank"
                                                      href="https://www.instagram.com/consciousplanet"
                                                      style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#2CB543;font-size:14px"><img
                                                        title="Instagram"
                                                        src="https://ptpbhc.stripocdn.email/content/assets/img/social-icons/logo-white/instagram-logo-white.png"
                                                        alt="Inst" width="32"
                                                        style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a>
                                                  </td>
                                                  <td align="center" valign="top"
                                                    style="padding:0;Margin:0;padding-right:5px"><a target="_blank"
                                                      href="https://www.youtube.com/watch?v=hyT-6qiubd0"
                                                      style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#2CB543;font-size:14px"><img
                                                        title="Youtube"
                                                        src="https://ptpbhc.stripocdn.email/content/assets/img/social-icons/logo-white/youtube-logo-white.png"
                                                        alt="Yt" width="32"
                                                        style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a>
                                                  </td>
                                                  <td align="center" valign="top" style="padding:0;Margin:0"><a
                                                      target="_blank" href="https://www.consciousplanet.org/"
                                                      style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#2CB543;font-size:14px"><img
                                                        title="World"
                                                        src="https://ptpbhc.stripocdn.email/content/assets/img/other-icons/logo-white/globe-logo-white.png"
                                                        alt="World" width="32"
                                                        style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <!--[if mso]></td></tr></table><![endif]-->
                          </td>
                        </tr>
                        <tr class="es-mobile-hidden">
                          <td class="es-m-p0l" align="left"
                            style="Margin:0;padding-top:10px;padding-left:10px;padding-bottom:15px;padding-right:25px">
                            <!--[if mso]><table style="width:565px" cellpadding="0" cellspacing="0"><tr><td style="width:428px" valign="top"><![endif]-->
                            <table cellpadding="0" cellspacing="0" align="left" class="es-left"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                              <tbody>
                                <tr>
                                  <td align="left" class="es-m-p20b" style="padding:0;Margin:0;width:428px">
                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                      <tbody>
                                        <tr>
                                          <td align="left" style="padding:0;Margin:0;padding-left:25px">
                                            <p
                                              style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#ffffff;font-size:14px">
                                              Conscious Planet<br>725 Cool Springs Blvd<br>Suite 245 Franklin<br>TN
                                              37067 USA</p>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td align="left" style="padding:0;Margin:0;padding-top:5px;padding-left:25px">
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
                                                  href="unsubscribe_from_list">Unsubscribe</a></u> | <u><a
                                                  target="_blank"
                                                  style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#ffffff;font-size:12px;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif"
                                                  href="manage_subscription">Manage Email Preferences</a></u></p>
                                          </td>
                                        </tr>
                                        <!--[if !mso]><!-- -->
                                        <!--<![endif]-->
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <!--[if mso]></td><td style="width:10px"></td><td style="width:127px" valign="top"><![endif]-->
                            <table cellpadding="0" cellspacing="0" class="es-right" align="right"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                              <tbody>
                                <tr>
                                  <td align="left" style="padding:0;Margin:0;width:127px">
                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                      <tbody>
                                        <tr>
                                          <td align="center"
                                            style="padding:0;Margin:0;padding-right:10px;font-size:0px"><a
                                              target="_blank" href="https://www.consciousplanet.org/"
                                              style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#2CB543;font-size:14px"><img
                                                class="adapt-img"
                                                src="https://ptpbhc.stripocdn.email/content/guids/CABINET_14cf1a8761a47eadb9f45661e7f8f9e0/images/save_soil_dp_logo.png"
                                                alt=""
                                                style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"
                                                width="117"></a></td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <!--[if mso]></td></tr></table><![endif]-->
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

</body>

</html>


```
