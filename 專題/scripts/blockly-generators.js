Blockly.Cpp['boost_scanf'] = function(block) {
    var format = Blockly.Cpp.valueToCode(block, 'FORMAT', Blockly.Cpp.ORDER_ATOMIC);
    return 'scanf("%s", ' + format + ');\n';
};

Blockly.Cpp['boost_printf'] = function(block) {
    var format = Blockly.Cpp.valueToCode(block, 'FORMAT', Blockly.Cpp.ORDER_ATOMIC);
    return 'printf("%s", ' + format + ');\n';
};

Blockly.Cpp['boost_ios_sync'] = function(block) {
    return 'std::ios::sync_with_stdio(0);\n';
};

Blockly.Cpp['boost_cin_tie'] = function(block) {
    return 'std::cin.tie(0);\n';
};

Blockly.Cpp['boost_cout_tie'] = function(block) {
    return 'std::cout.tie(0);\n';
};

Blockly.cpp['include_bits/stdc++.h'] = function(block) {
    return '#include <bits/stdc++.h>\n';
};

Blockly.Cpp['variable_declaration'] = function(block) {
    var type = block.getFieldValue('TYPE');
    var varName = Blockly.Cpp.variableDB_.getName(block.getFieldValue('VAR_NAME'), Blockly.Variables.NAME_TYPE);
    var value = Blockly.Cpp.valueToCode(block, 'VALUE', Blockly.Cpp.ORDER_ASSIGNMENT) || '0'; // 預設值
    return `${type} ${varName} = ${value};\n`;
};

Blockly.Cpp['variable_assignment'] = function(block) {
    var varName = Blockly.Cpp.variableDB_.getName(block.getFieldValue('VAR_NAME'), Blockly.Variables.NAME_TYPE);
    var value = Blockly.Cpp.valueToCode(block, 'VALUE', Blockly.Cpp.ORDER_ASSIGNMENT) || '0';
    return `${varName} = ${value};\n`;
};

Blockly.Cpp['variable_get'] = function(block) {
    var varName = Blockly.Cpp.variableDB_.getName(block.getFieldValue('VAR_NAME'), Blockly.Variables.NAME_TYPE);
    return varName;
};

Blockly.Cpp['comment_block'] = function(block) {
    var comment = block.getFieldValue('COMMENT');
    return `// ${comment}\n`;
};

Blockly.Cpp['function_call'] = function(block) {
    var funcName = Blockly.Cpp.variableDB_.getName(block.getFieldValue('FUNC_NAME'), Blockly.Variables.NAME_TYPE);
    return `${funcName}();\n`;
};

Blockly.Cpp['basic_function_definition'] = function(block) {
    var funcName = Blockly.Cpp.variableDB_.getName(block.getFieldValue('FUNC_NAME'), Blockly.Variables.NAME_TYPE);
    var returnType = block.getFieldValue('RETURN_TYPE');
    var body = Blockly.Cpp.statementToCode(block, 'DO') || '// 函數執行的代碼\n';

    if (returnType === 'void') {
        return `${returnType} ${funcName}() {\n${body}}\n`;
    } else {
        return `${returnType} ${funcName}() {\n${body} return 0;\n}\n`;
    }
};

Blockly.Cpp['break_block'] = function() {
    return 'break;\n';
};

Blockly.Cpp['continue_block'] = function() {
    return 'continue;\n';
};

Blockly.Cpp['return_block'] = function(block) {
    var returnValue = Blockly.Cpp.valueToCode(block, 'RETURN_VALUE', Blockly.Cpp.ORDER_NONE) || '0';
    return `return ${returnValue};\n`;
};

Blockly.Cpp['switch_block'] = function(block) {
    var switchValue = Blockly.Cpp.valueToCode(block, 'SWITCH_VALUE', Blockly.Cpp.ORDER_NONE) || '0';
    var caseStatements = Blockly.Cpp.statementToCode(block, 'DO');
    var code = `switch (${switchValue}) {\n${caseStatements}}\n`;
    return code;
};

Blockly.Cpp['case_block'] = function(block) {
    var caseValue = Blockly.Cpp.valueToCode(block, 'CASE_VALUE', Blockly.Cpp.ORDER_NONE) || '0';
    var statements_do = Blockly.Cpp.statementToCode(block, 'DO');
    var code = `case ${caseValue}:\n${statements_do}\n`;
    return code;
};

Blockly.Cpp['default_block'] = function(block) {
    var statements_do = Blockly.Cpp.statementToCode(block, 'DO');
    var code = `default:\n${statements_do}\n`;
    return code;
};

Blockly.Cpp['main_block'] = function(block) {
    var statements_body = Blockly.Cpp.statementToCode(block, 'BODY');
    return `int main() {\n${statements_body}return 0;\n}\n`;
};

Blockly.Cpp['controls_if'] = function(block) {
    var n = 0;
    var code = '';
    do {
        var conditionCode = Blockly.Cpp.valueToCode(block, 'IF' + n, Blockly.Cpp.ORDER_NONE) || 'false';
        var branchCode = Blockly.Cpp.statementToCode(block, 'DO' + n);
        code += (n === 0 ? 'if (' : ' else if (') + conditionCode + ') {\n' + branchCode + '}\n';
        ++n;
    } while (block.getInput('IF' + n));

    if (block.getInput('ELSE')) {
        var elseBranch = Blockly.Cpp.statementToCode(block, 'ELSE');
        code += ' else {\n' + elseBranch + '}\n';
    }
    return code;
};

Blockly.Cpp['for_block'] = function(block) {
    var varName = Blockly.Cpp.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var init = Blockly.Cpp.valueToCode(block, 'INIT', Blockly.Cpp.ORDER_NONE);
    var condition = Blockly.Cpp.valueToCode(block, 'CONDITION', Blockly.Cpp.ORDER_NONE) || 'false';
    var increment = Blockly.Cpp.valueToCode(block, 'INCREMENT', Blockly.Cpp.ORDER_NONE);
    var branch = Blockly.Cpp.statementToCode(block, 'DO');
    return `for (int ${varName} = ${init}; ${condition}; ${increment}) {\n${branch}}\n`;
};

Blockly.Cpp['while_block'] = function(block) {
    var condition = Blockly.Cpp.valueToCode(block, 'CONDITION', Blockly.Cpp.ORDER_NONE) || 'false';
    var branch = Blockly.Cpp.statementToCode(block, 'DO');
    return `while (${condition}) {\n${branch}}\n`;
};

Blockly.Cpp['cin_block'] = function(block) {
    var value_var = Blockly.Cpp.valueToCode(block, 'VAR', Blockly.Cpp.ORDER_ATOMIC) || 'variable';
    var code = 'std::cin >> ' + value_var + ';\n';
    return code;
};

Blockly.Cpp['cout_block'] = function(block) {
    var argument = Blockly.Cpp.valueToCode(block, 'TEXT', Blockly.Cpp.ORDER_NONE) || '""';
    var code = 'std::cout << ' + argument + ' << std::endl;\n';
    return code;
};

Blockly.Cpp['vector'] = function(block) {
    
}

function saveWorkspaceAsXML() {
    var xml = Blockly.Xml.workspaceToDom(workspace);
    var xmlText = Blockly.Xml.domToPrettyText(xml);
    var blob = new Blob([xmlText], { type: 'text/xml' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'workspace.xml';
    link.click();
}

function handleXMLUpload(event) {
    var file = event.target.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function(event) {
            var xml_text = event.target.result;
            var xml = Blockly.Xml.textToDom(xml_text);
            Blockly.Xml.domToWorkspace(xml, workspace);
        };
        reader.readAsText(file);
    }
}

function saveCodeAsCPP() {
    var code = Blockly.Cpp.workspaceToCode(workspace);
    var blob = new Blob([code], {type: "text/plain"});
    var link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "code.cpp";
    link.click();
}

function loadCodeFromCPP(event) {
    var file = event.target.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function(event) {
            var code = event.target.result;
            // 這裡可以解析 C++ 代碼並將其轉換回 Blockly 積木
        };
        reader.readAsText(file);
    }
}