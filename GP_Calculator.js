var orig_op = '';

function type_in_box(number)
{
    if (document.getElementById("opcount").innerHTML == 0)
    {
        if (document.getElementById("calcbox2").innerHTML == '0.')
        {
            document.getElementById("calcbox2").innerHTML += number;
        }
        else if (document.getElementById("calcbox2").innerHTML == 0 && document.getElementById("calcbox2").innerHTML.includes('.') != true)
        {
            document.getElementById("calcbox2").innerHTML = number;
        }
        else
        {
            document.getElementById("calcbox2").innerHTML += number;
        }
    }
    else
    {
        if (document.getElementById("calcbox2").innerHTML == document.getElementById("memory").innerHTML)
        {
            document.getElementById("calcbox2").innerHTML = number;
        }
        else if (document.getElementById("operator").innerHTML == orig_op)
        {
            document.getElementById("calcbox2").innerHTML = number;
        }
        else if (document.getElementById("calcbox2").innerHTML == '0.')
        {
            document.getElementById("calcbox2").innerHTML += number;
        }
        else if (document.getElementById("calcbox2").innerHTML == '0')
        {
            document.getElementById("calcbox2").innerHTML = number;
        }
        else
        {
            document.getElementById("calcbox2").innerHTML += number;
        }
    }                
}

function pressOp(operator)
{
    if (document.getElementById("operator").innerHTML != orig_op)
    {
        equals();
    }

    document.getElementById("memory").innerHTML = document.getElementById("calcbox2").innerHTML;
    document.getElementById("operator").innerHTML = operator;
    /*document.getElementById("calcbox2").innerHTML = 0;*/
    document.getElementById("express").innerHTML = document.getElementById("memory").innerHTML + '' + operator;
    opcount();   
}

function DeciCount(num)
{
    if (num % 1 != 0)
    {
        var dec = num.toString().split(".")[1].length;
        return dec;
    }

    return 0;                
}

function equals()
{
    var b = parseFloat(document.getElementById("calcbox2").innerHTML);
    var a = parseFloat(document.getElementById("memory").innerHTML);
    var operator = document.getElementById("operator").innerHTML;
    var results = 0;

    var b_dp = DeciCount(b);
    var a_dp = DeciCount(a);
    var decix = null;

    if (operator == '+')
    {
        if (b_dp > a_dp)
        {
            decix = b_dp;
        }
        else if (b_dp < a_dp)
        {
            decix = a_dp;
        }
        else if (b_dp == 0 && a_dp == 0)
        {
            /*decix remains null*/
        }
        else
        {
            decix = b_dp;
        }
        results = (a + b).toFixed(decix);
    }
    if (operator == '-')
    {
        if (b_dp > a_dp)
        {
            decix = b_dp;
        }
        else if (b_dp < a_dp)
        {
            decix = a_dp;
        }
        else if (b_dp == 0 && a_dp == 0)
        {
            /*decix remains null*/
        }
        else
        {
            decix = b_dp;
        }
        results = (a - b).toFixed(decix);
    }
    if (operator == 'x')
    {
        if (b_dp == 0 && a_dp == 0)
        {
            /*decix remains null*/
        }
        else
        {
            decix = a_dp + b_dp;
        } 
        results = (a * b).toFixed(decix);
    }
    if (operator == '/')
    {
        results = a / b;
    }

    x = document.getElementById("calcbox2").innerHTML;
    y = document.getElementById("memory").innerHTML + '' + operator + '' + x + " = ";

    document.getElementById("memory").innerHTML = '0';
    document.getElementById("calcbox2").innerHTML = results;
    document.getElementById("operator").innerHTML = orig_op;
    document.getElementById("express").innerHTML = y;
}

function C()
{
    document.getElementById("calcbox2").innerHTML = '0';
    document.getElementById("operator").innerHTML = orig_op;
    document.getElementById("memory").innerHTML = '0';
    document.getElementById("express").innerHTML = null;
    opcount(0);
}

function one_over_x()
{
    var results = 0;
    var x = parseFloat(document.getElementById("calcbox2").innerHTML);
    results = 1 / x;
    
    document.getElementById("calcbox2").innerHTML = results;
    document.getElementById("operator").innerHTML = orig_op;
    document.getElementById("memory").innerHTML = '0';
    document.getElementById("express").innerHTML = "1 / " + x + " = ";

    opcount();
}

function addinv()
{
    x = parseFloat(document.getElementById("calcbox2").innerHTML);
    y = 0 - x;
    document.getElementById("calcbox2").innerHTML = y;
}

function sqrt()
{
    var x = document.getElementById("calcbox2").innerHTML;
    var y = Math.sqrt(x);
    document.getElementById("calcbox2").innerHTML = y;
    document.getElementById("express").innerHTML = "&#8730 " + x + " = ";
    opcount();
}

function ln()
{
    var x = document.getElementById("calcbox2").innerHTML;
    var y = Math.log(x);
    document.getElementById("calcbox2").innerHTML = y;
    document.getElementById("express").innerHTML = "ln (" + x + ") = ";
    opcount();
}

function decimal()
{
    if (document.getElementById("calcbox2").innerHTML == 0)
    {
        document.getElementById("calcbox2").innerHTML = "0.";
    }
    else if (document.getElementById("calcbox2").innerHTML.includes('.'))
    {
        /*do nothing since this would mean the value already has a decimal*/
    }
    else
    {
        type_in_box('.');
    }
}

function uniKeyCode(event)
{
    var x = event.which || event.keyCode;
    var y = String.fromCharCode(x);

    if (x >= 48 && x <= 57)
    {
        type_in_box(y);
    }
    if (x == 43 || x == 45 || x == 42 || x == 47)
    {
        pressOp(y);
    }
    if (x == 46)
    {
        decimal();
    }
    if (x == 13)
    {
        equals();
    }
    if (x == 99)
    {
        C();
    }
}

function opcount(x)
{
    if (x == 0)
    {
        document.getElementById("opcount").innerHTML = '0';
    }
    else
    {
        y = parseInt(document.getElementById("opcount").innerHTML);
        y += 1;
        document.getElementById("opcount").innerHTML = y;
    }
}