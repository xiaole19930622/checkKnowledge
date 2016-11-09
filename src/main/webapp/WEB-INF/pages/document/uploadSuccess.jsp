<%@ page language='java' pageEncoding='utf-8' %>
<%@include file="../header.jsp" %>

</head>
<body>
<%@include file="../nav.jsp" %>

<div class="container">

    <div class="starter-template">
        <div class="row">
            <div class="col-md-4"></div>
            <div class="col-md-4"><h1 class="text-center">恭喜文档上传成功!</h1></div>
            <div class="col-md-4 "><h1 id="turnToUpload" class="btn btnColorSubmit btn-lg">继续上传</h1></div>
        </div>

        <p class="lead text-center">世界这么大，你的贡献更伟大</p>
    </div>

</div>
<script>
    $(document).ready(function(){
        $("#turnToUpload").on('click',function(){
            window.location.href=ctx+"/document/upload";
        });
    });
</script>
<%@include file="../footer.jsp" %>
</body>
</html>
