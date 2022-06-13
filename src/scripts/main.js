window.onload=function()
{
    document.getElementById('btn_list').onclick=function()
    {
        if(read_value=="true")
        {
            let option = 'top=10, left=10, width=1000, height=600, status=no, menubar=no, toolbar=no, resizable=no';
            let popup_list = window.open('/list', 'form', option);
        }
        else
        {
            alert("읽기 권한이 없습니다.");
        }
        
    };
    
    document.getElementById('btn_register').onclick=function()
    {
        if(write_value=="true")
        {
            let option = 'top=10, left=10, width=500, height=600, status=no, menubar=no, toolbar=no, resizable=no';
            let popup_list = window.open('/register', 'form', option);
        }
        else
        {
            alert("등록 권한이 없습니다.");
        }
    };
}
