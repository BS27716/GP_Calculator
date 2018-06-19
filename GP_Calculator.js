var orig_op = '';

function type_in_box(number)
{
    if (document.getElementById("opcount").innerHTML == 0)
    {
        if (document.getElementById("calcbox2").innerHTML == '0.')
        {
            document.getElementById("calcbox2").innerHTML += number;
        }
        else if (document.getElementById("calcbox2").innerHTML == 0)
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
        else if (document.getElementById("calcbox2").innerHTML == '0')
        {
            document.getElementById("calcbox2").innerHTML = number;
        }
        else if (document.getElementById("calcbox2").innerHTML == '0.')
        {
            document.getElementById("calcbox2").innerHTML += number;
        }
        else
        {
            document.getElementById("calcbox2").innerHTML += number;
        }
    }                
}

function pressOp(operator)
{
    document.getElementById("memory").innerHTML = document.getElementById("calcbox2").innerHTML;
    document.getElementById("operator").innerHTML = operator;
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
    var decix = 0;

    if (operator == '+')
    {
        results = a + b;
        if (b_dp > a_dp)
        {
            decix = b_dp;
        }
        else if (b_dp < a_dp)
        {
            decix = a_dp;
        }
        else
        {
            decix = b_dp;
        }
    }
    if (operator == '-')
    {
        results = a - b;
        if (b_dp > a_dp)
        {
            decix = b_dp;
        }
        else if (b_dp < a_dp)
        {
            decix = a_dp;
        }
        else
        {
            decix = b_dp;
        }
    }
    if (operator == 'x')
    {
        results = a * b;
        decix = a_dp + b_dp;
    }
    if (operator == '/')
    {
        results = a / b;
        
        /*if (b_dp > a_dp)
        {
            decix = b_dp - a_dp;
        }
        else if (b_dp < a_dp)
        {
            decix = a_dp - b_dp;
        }
        else
        {
            decix = b_dp;
        }*/

        decix=10;
    }

    document.getElementById("calcbox2").innerHTML = results.toFixed(decix);
    document.getElementById("operator").innerHTML = orig_op;
    document.getElementById("memory").innerHTML = '0';
}

function C()
{
    document.getElementById("calcbox2").innerHTML = '0';
    document.getElementById("operator").innerHTML = orig_op;
    document.getElementById("memory").innerHTML = '0';
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

    opcount();
}

function addinv()
{
    var x = parseFloat(document.getElementById("calcbox2").innerHTML);
    var y = 0 - x;
    document.getElementById("calcbox2").innerHTNL = y;
}

function sqrt()
{
    var x = document.getElementById("calcbox2").innerHTML;
    document.getElementById("calcbox2").innerHTML = Math.sqrt(x);
    opcount();
}

function ln()
{
    var x = document.getElementById("calcbox2").innerHTML;
    document.getElementById("calcbox2").innerHTML = Math.log(x);
    opcount();
}

function decimal()
{
    if (document.getElementById("calcbox2").innerHTML == 0)
    {
        document.getElementById("calcbox2").innerHTML = "0.";
    }
    else if (Math.abs(parseFloat(document.getElementById("calcbox2").innerHTML)) > 0 && Math.abs(parseFloat(document.getElementById("calcbox2").innerHTML)) < 1)
    {
        /*do nothing since this would mean the value already has a decimal */
    }
    else
    {
        type_in_box('.');
    }
}

function uniKeyCode(event)
{
    var x = event.keyCode;
    if ((x >= 48 && x <= 57) || (x >= 96 && x <= 105))
    {
        var y = String.fromCharCode(x);
        type_in_box(y);
    }
    if (x == 43 || x == 107 || x == 45 || x == 109 || x == 42 || x == 106 || x == 47 || x == 111)
    {
        var y = String.fromCharCode(x);
        pressOp(y);
    }
    if (x == 46 || x == 107 || x == 110)
    {
        decimal();
    }
    if (x == 13 || x == 187)
    {
        equals();
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