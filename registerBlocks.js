'use strict'
const Blockly = require('blockly');
const BlocklyLua = require('blockly/lua');
const blocks = require('./blocks.json');

/**
 *  Add all code generators for custom blocks
 */
const registerBlocks = () => {
  Blockly.common.defineBlocksWithJsonArray(blocks)

  BlocklyLua.luaGenerator.math_atan2 = function (block) {
    const valueY = BlocklyLua.luaGenerator.valueToCode(block, 'y', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueX = BlocklyLua.luaGenerator.valueToCode(block, 'x', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const code = 'math.atan2 (' + valueY + ', ' + valueX + ')'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.math_sin = function (block) {
    const valueValue = BlocklyLua.luaGenerator.valueToCode(block, 'value', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const code = 'math.sin(' + valueValue + ')'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.math_cos = function (block) {
    const valueVal = BlocklyLua.luaGenerator.valueToCode(block, 'val', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const code = 'math.cos(' + valueVal + ')'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.for_index_item = function (block) {
    const variableIndex = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('index'), 'VARIABLE')
    const variableItem = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('item'), 'VARIABLE')
    const valueArray = BlocklyLua.luaGenerator.valueToCode(block, 'array', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const statementsInput = BlocklyLua.luaGenerator.statementToCode(block, 'input')
    return 'for ' + variableIndex + ', ' + variableItem + ' in ipairs(' + valueArray + ') do\n' + statementsInput + 'end\n'
  }

  BlocklyLua.luaGenerator.table_remove = function (block) {
    const valueTable = BlocklyLua.luaGenerator.valueToCode(block, 'table', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueIndex = BlocklyLua.luaGenerator.valueToCode(block, 'index', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    return 'table.remove(' + valueTable + ', ' + valueIndex + ')\n'
  }

  BlocklyLua.luaGenerator.graphics_setnewfont = function (block) {
    const valueSize = BlocklyLua.luaGenerator.valueToCode(block, 'size', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    return 'love.graphics.setNewFont( ' + valueSize + ' )\n'
  }

  BlocklyLua.luaGenerator.love_mousereleased = function (block) {
    const variableX = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('x'), 'VARIABLE')
    const variableY = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('y'), 'VARIABLE')
    const variableButton = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('button'), 'VARIABLE')
    const variableIstouchy = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('istouchy'), 'VARIABLE')
    const variablePresses = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('presses'), 'VARIABLE')
    const statementsInput = BlocklyLua.luaGenerator.statementToCode(block, 'input')
    return 'function love.mousereleased( ' + variableX + ', ' + variableY + ', ' + variableButton + ', ' + variableIstouchy + ', ' + variablePresses + ' ) \n' + statementsInput + 'end\n'
  }

  BlocklyLua.luaGenerator.love_keypressed = function (block) {
    const variableKey = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('key'), 'VARIABLE')
    const variableScancode = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('scancode'), 'VARIABLE')
    const variableIsrepeat = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('isrepeat'), 'VARIABLE')
    const statementsInput = BlocklyLua.luaGenerator.statementToCode(block, 'input')
    return 'function love.keypressed( ' + variableKey + ', ' + variableScancode + ', ' + variableIsrepeat + ' ) \n' + statementsInput + 'end\n'
  }

  BlocklyLua.luaGenerator.love_keyreleased = function (block) {
    const variableKey = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('key'), 'VARIABLE')
    const variableScancode = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('scancode'), 'VARIABLE')
    const statementsInput = BlocklyLua.luaGenerator.statementToCode(block, 'input')
    return 'function love.keyreleased( ' + variableKey + ', ' + variableScancode + ' ) \n' + statementsInput + 'end\n'
  }

  BlocklyLua.luaGenerator.love_directorydropped = function (block) {
    const variablePath = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('path'), 'VARIABLE')
    const statementsInput = BlocklyLua.luaGenerator.statementToCode(block, 'input')
    return 'function love.directorydropped( ' + variablePath + ' ) \n' + statementsInput + 'end\n'
  }

  BlocklyLua.luaGenerator.love_displayrotated = function (block) {
    const variableIndex = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('index'), 'VARIABLE')
    const variableOrientation = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('orientation'), 'VARIABLE')
    const statementsInput = BlocklyLua.luaGenerator.statementToCode(block, 'input')
    return 'function love.displayrotated( ' + variableIndex + ', ' + variableOrientation + ' ) \n' + statementsInput + 'end\n'
  }

  BlocklyLua.luaGenerator.love_draw = function (block) {
    const statementsInput = BlocklyLua.luaGenerator.statementToCode(block, 'input')
    return 'function love.draw() \n' + statementsInput + 'end\n'
  }

  BlocklyLua.luaGenerator.love_errorhandler = function (block) {
    const variableMsg = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('msg'), 'VARIABLE')
    const statementsInput = BlocklyLua.luaGenerator.statementToCode(block, 'input')
    return 'function love.errorhandler( ' + variableMsg + ' ) \n' + statementsInput + 'end\n'
  }

  BlocklyLua.luaGenerator.love_filedropped = function (block) {
    const variableFile = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('file'), 'VARIABLE')
    const statementsInput = BlocklyLua.luaGenerator.statementToCode(block, 'input')
    return 'function love.filedropped( ' + variableFile + ' ) \n' + statementsInput + 'end\n'
  }

  BlocklyLua.luaGenerator.love_focus = function (block) {
    const variableFocus = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('focus'), 'VARIABLE')
    const statementsInput = BlocklyLua.luaGenerator.statementToCode(block, 'input')
    return 'function love.focus( ' + variableFocus + ' ) \n' + statementsInput + 'end\n'
  }

  BlocklyLua.luaGenerator.love_gamepadaxis = function (block) {
    const variableJoystick = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('joystick'), 'VARIABLE')
    const variableAxis = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('axis'), 'VARIABLE')
    const variableValue = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('value'), 'VARIABLE')
    const statementsInput = BlocklyLua.luaGenerator.statementToCode(block, 'input')
    return 'function love.gamepadaxis( ' + variableJoystick + ', ' + variableAxis + ', ' + variableValue + ' ) \n' + statementsInput + 'end\n'
  }

  BlocklyLua.luaGenerator.love_gamepadpressed = function (block) {
    const variableJoystick = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('joystick'), 'VARIABLE')
    const variableButton = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('button'), 'VARIABLE')
    const statementsInput = BlocklyLua.luaGenerator.statementToCode(block, 'input')
    return 'function love.gamepadpressed( ' + variableJoystick + ', ' + variableButton + ' ) \n' + statementsInput + 'end\n'
  }

  BlocklyLua.luaGenerator.love_gamepadreleased = function (block) {
    const variableJoystick = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('joystick'), 'VARIABLE')
    const variableButton = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('button'), 'VARIABLE')
    const statementsInput = BlocklyLua.luaGenerator.statementToCode(block, 'input')
    return 'function love.gamepadreleased( ' + variableJoystick + ', ' + variableButton + ' ) \n' + statementsInput + 'end\n'
  }

  BlocklyLua.luaGenerator.love_joystickadded = function (block) {
    const variableJoystick = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('joystick'), 'VARIABLE')
    const statementsInput = BlocklyLua.luaGenerator.statementToCode(block, 'input')
    return 'function love.joystickadded( ' + variableJoystick + ' ) \n' + statementsInput + 'end\n'
  }

  BlocklyLua.luaGenerator.love_joystickaxis = function (block) {
    const variableJoystick = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('joystick'), 'VARIABLE')
    const variableAxis = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('axis'), 'VARIABLE')
    const variableValue = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('value'), 'VARIABLE')
    const statementsInput = BlocklyLua.luaGenerator.statementToCode(block, 'input')
    return 'function love.joystickaxis( ' + variableJoystick + ', ' + variableAxis + ', ' + variableValue + ' ) \n' + statementsInput + 'end\n'
  }

  BlocklyLua.luaGenerator.love_joystickhat = function (block) {
    const variableJoystick = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('joystick'), 'VARIABLE')
    const variableHat = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('hat'), 'VARIABLE')
    const variableDirection = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('direction'), 'VARIABLE')
    const statementsInput = BlocklyLua.luaGenerator.statementToCode(block, 'input')
    return 'function love.joystickhat( ' + variableJoystick + ', ' + variableHat + ', ' + variableDirection + ' ) \n' + statementsInput + 'end\n'
  }

  BlocklyLua.luaGenerator.love_joystickpressed = function (block) {
    const variableJoystick = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('joystick'), 'VARIABLE')
    const variableButton = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('button'), 'VARIABLE')
    const statementsInput = BlocklyLua.luaGenerator.statementToCode(block, 'input')
    return 'function love.joystickpressed( ' + variableJoystick + ', ' + variableButton + ' ) \n' + statementsInput + 'end\n'
  }

  BlocklyLua.luaGenerator.love_joystickreleased = function (block) {
    const variableJoystick = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('joystick'), 'VARIABLE')
    const variableButton = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('button'), 'VARIABLE')
    const statementsInput = BlocklyLua.luaGenerator.statementToCode(block, 'input')
    return 'function love.joystickreleased( ' + variableJoystick + ', ' + variableButton + ' ) \n' + statementsInput + 'end\n'
  }

  BlocklyLua.luaGenerator.love_joystickremoved = function (block) {
    const variableJoystick = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('joystick'), 'VARIABLE')
    const statementsInput = BlocklyLua.luaGenerator.statementToCode(block, 'input')
    return 'function love.joystickremoved( ' + variableJoystick + ' ) \n' + statementsInput + 'end\n'
  }

  BlocklyLua.luaGenerator.love_load = function (block) {
    const statementsInput = BlocklyLua.luaGenerator.statementToCode(block, 'input')
    return 'function love.load() \n' + statementsInput + 'end\n'
  }

  BlocklyLua.luaGenerator.love_lowmemory = function (block) {
    const statementsInput = BlocklyLua.luaGenerator.statementToCode(block, 'input')
    return 'function love.lowmemory() \n' + statementsInput + 'end\n'
  }

  BlocklyLua.luaGenerator.love_mousefocus = function (block) {
    const variableFocus = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('focus'), 'VARIABLE')
    const statementsInput = BlocklyLua.luaGenerator.statementToCode(block, 'input')
    return 'function love.mousefocus( ' + variableFocus + ' ) \n' + statementsInput + 'end\n'
  }

  BlocklyLua.luaGenerator.love_mousemoved = function (block) {
    const variableX = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('x'), 'VARIABLE')
    const variableY = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('y'), 'VARIABLE')
    const variableDx = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('dx'), 'VARIABLE')
    const variableDy = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('dy'), 'VARIABLE')
    const variableIstouch = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('istouch'), 'VARIABLE')
    const statementsInput = BlocklyLua.luaGenerator.statementToCode(block, 'input')
    return 'function love.mousemoved( ' + variableX + ', ' + variableY + ', ' + variableDx + ', ' + variableDy + ', ' + variableIstouch + ' ) \n' + statementsInput + 'end\n'
  }

  BlocklyLua.luaGenerator.love_mousepressed = function (block) {
    const variableX = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('x'), 'VARIABLE')
    const variableY = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('y'), 'VARIABLE')
    const variableButton = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('button'), 'VARIABLE')
    const variableIstouch = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('istouch'), 'VARIABLE')
    const variablePresses = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('presses'), 'VARIABLE')
    const statementsInput = BlocklyLua.luaGenerator.statementToCode(block, 'input')
    return 'function love.mousepressed( ' + variableX + ', ' + variableY + ', ' + variableButton + ', ' + variableIstouch + ', ' + variablePresses + ' ) \n' + statementsInput + 'end\n'
  }

  BlocklyLua.luaGenerator.love_quit = function (block) {
    const statementsInput = BlocklyLua.luaGenerator.statementToCode(block, 'input')
    return 'function love.quit() \n' + statementsInput + 'end\n'
  }

  BlocklyLua.luaGenerator.love_resize = function (block) {
    const variableWidth = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('width'), 'VARIABLE')
    const variableHeight = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('height'), 'VARIABLE')
    const statementsInput = BlocklyLua.luaGenerator.statementToCode(block, 'input')
    return 'function love.resize( ' + variableWidth + ', ' + variableHeight + ' ) \n' + statementsInput + 'end\n'
  }

  BlocklyLua.luaGenerator.love_run = function (block) {
    const statementsInput = BlocklyLua.luaGenerator.statementToCode(block, 'input')
    return 'function love.run() \n' + statementsInput + 'end\n'
  }

  BlocklyLua.luaGenerator.love_textedited = function (block) {
    const variableText = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('text'), 'VARIABLE')
    const variableStart = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('start'), 'VARIABLE')
    const variableLength = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('length'), 'VARIABLE')
    const statementsInput = BlocklyLua.luaGenerator.statementToCode(block, 'input')
    return 'function love.textedited( ' + variableText + ', ' + variableStart + ', ' + variableLength + ' ) \n' + statementsInput + 'end\n'
  }

  BlocklyLua.luaGenerator.love_textinput = function (block) {
    const variableText = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('text'), 'VARIABLE')
    const statementsInput = BlocklyLua.luaGenerator.statementToCode(block, 'input')
    return 'function love.textinput( ' + variableText + ' ) \n' + statementsInput + 'end\n'
  }

  BlocklyLua.luaGenerator.love_threaderror = function (block) {
    const variableThread = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('thread'), 'VARIABLE')
    const variableErrorstr = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('errorstr'), 'VARIABLE')
    const statementsInput = BlocklyLua.luaGenerator.statementToCode(block, 'input')
    return 'function love.threaderror( ' + variableThread + ', ' + variableErrorstr + ' ) \n' + statementsInput + 'end\n'
  }

  BlocklyLua.luaGenerator.love_touchmoved = function (block) {
    const variableId = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('id'), 'VARIABLE')
    const variableX = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('x'), 'VARIABLE')
    const variableY = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('y'), 'VARIABLE')
    const variableDx = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('dx'), 'VARIABLE')
    const variableDy = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('dy'), 'VARIABLE')
    const variablePressure = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('pressure'), 'VARIABLE')
    const statementsInput = BlocklyLua.luaGenerator.statementToCode(block, 'input')
    return 'function love.touchmoved( ' + variableId + ', ' + variableX + ', ' + variableY + ', ' + variableDx + ', ' + variableDy + ', ' + variablePressure + ' ) \n' + statementsInput + 'end\n'
  }

  BlocklyLua.luaGenerator.love_touchpressed = function (block) {
    const variableId = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('id'), 'VARIABLE')
    const variableX = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('x'), 'VARIABLE')
    const variableY = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('y'), 'VARIABLE')
    const variableDx = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('dx'), 'VARIABLE')
    const variableDy = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('dy'), 'VARIABLE')
    const variablePressure = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('pressure'), 'VARIABLE')
    const statementsInput = BlocklyLua.luaGenerator.statementToCode(block, 'input')
    return 'function love.touchpressed( ' + variableId + ', ' + variableX + ', ' + variableY + ', ' + variableDx + ', ' + variableDy + ', ' + variablePressure + ' ) \n' + statementsInput + 'end\n'
  }

  BlocklyLua.luaGenerator.love_touchreleased = function (block) {
    const variableId = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('id'), 'VARIABLE')
    const variableX = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('x'), 'VARIABLE')
    const variableY = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('y'), 'VARIABLE')
    const variableDx = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('dx'), 'VARIABLE')
    const variableDy = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('dy'), 'VARIABLE')
    const variablePressure = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('pressure'), 'VARIABLE')
    const statementsInput = BlocklyLua.luaGenerator.statementToCode(block, 'input')
    return 'function love.touchreleased( ' + variableId + ', ' + variableX + ', ' + variableY + ', ' + variableDx + ', ' + variableDy + ', ' + variablePressure + ' ) \n' + statementsInput + 'end\n'
  }

  BlocklyLua.luaGenerator.love_update = function (block) {
    const variableDt = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('dt'), 'VARIABLE')
    const statementsInput = BlocklyLua.luaGenerator.statementToCode(block, 'input')
    return 'function love.update( ' + variableDt + ' ) \n' + statementsInput + 'end\n'
  }

  BlocklyLua.luaGenerator.love_visible = function (block) {
    const variableVisible = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('visible'), 'VARIABLE')
    const statementsInput = BlocklyLua.luaGenerator.statementToCode(block, 'input')
    return 'function love.visible( ' + variableVisible + ' ) \n' + statementsInput + 'end\n'
  }

  BlocklyLua.luaGenerator.love_wheelmoved = function (block) {
    const variableX = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('x'), 'VARIABLE')
    const variableY = BlocklyLua.luaGenerator.nameDB_.getName(block.getFieldValue('y'), 'VARIABLE')
    const statementsInput = BlocklyLua.luaGenerator.statementToCode(block, 'input')
    return 'function love.wheelmoved( ' + variableX + ', ' + variableY + ' ) \n' + statementsInput + 'end\n'
  }

  BlocklyLua.luaGenerator.graphics_stencil = function (block) {
    const textStencilfunction = block.getFieldValue('stencilfunction')
    const dropdownAction = block.getFieldValue('action')
    const numberValue = block.getFieldValue('value')
    const valueKeepvalues = BlocklyLua.luaGenerator.valueToCode(block, 'keepvalues', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    return 'love.graphics.stencil( ' + textStencilfunction + ', "' + dropdownAction + '", ' + numberValue + ', ' + valueKeepvalues + ' )\n'
  }

  BlocklyLua.luaGenerator.graphics_rectangle = function (block) {
    const dropdownMode = block.getFieldValue('mode')
    const valueX = BlocklyLua.luaGenerator.valueToCode(block, 'x', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueY = BlocklyLua.luaGenerator.valueToCode(block, 'y', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueWidth = BlocklyLua.luaGenerator.valueToCode(block, 'width', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueHeight = BlocklyLua.luaGenerator.valueToCode(block, 'height', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueRx = BlocklyLua.luaGenerator.valueToCode(block, 'rx', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueRy = BlocklyLua.luaGenerator.valueToCode(block, 'ry', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueSegments = BlocklyLua.luaGenerator.valueToCode(block, 'segments', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    return 'love.graphics.rectangle("' + dropdownMode + '", ' + valueX + ', ' + valueY + ', ' + valueWidth + ', ' + valueHeight + ', ' + valueRx + ', ' + valueRy + ', ' + valueSegments + ')\n'
  }

  BlocklyLua.luaGenerator.graphics_printf = function (block) {
    const valueText = BlocklyLua.luaGenerator.valueToCode(block, 'text', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const numberX = block.getFieldValue('x')
    const numberY = block.getFieldValue('y')
    const numberLimit = block.getFieldValue('limit')
    const dropdownAlignmode = block.getFieldValue('AlignMode')
    const numberR = block.getFieldValue('r')
    const numberSx = block.getFieldValue('sx')
    const numberSy = block.getFieldValue('sy')
    const numberOx = block.getFieldValue('ox')
    const numberOy = block.getFieldValue('oy')
    const numberKx = block.getFieldValue('kx')
    const numberKy = block.getFieldValue('ky')
    return 'love.graphics.printf(' + valueText + ', ' + numberX + ', ' + numberY + ', ' + numberLimit + ', "' + dropdownAlignmode + '", ' + numberR + ', ' + numberSx + ', ' + numberSy + ' , ' + numberOx + ', ' + numberOy + ', ' + numberKx + ', ' + numberKy + ')\n'
  }

  BlocklyLua.luaGenerator.graphics_print = function (block) {
    const valueText = BlocklyLua.luaGenerator.valueToCode(block, 'text', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueX = BlocklyLua.luaGenerator.valueToCode(block, 'x', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueY = BlocklyLua.luaGenerator.valueToCode(block, 'y', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueR = BlocklyLua.luaGenerator.valueToCode(block, 'r', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueSx = BlocklyLua.luaGenerator.valueToCode(block, 'sx', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueSy = BlocklyLua.luaGenerator.valueToCode(block, 'sy', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueOx = BlocklyLua.luaGenerator.valueToCode(block, 'ox', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueOy = BlocklyLua.luaGenerator.valueToCode(block, 'oy', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueKx = BlocklyLua.luaGenerator.valueToCode(block, 'kx', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueKy = BlocklyLua.luaGenerator.valueToCode(block, 'ky', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    return 'love.graphics.print(' + valueText + ', ' + valueX + ', ' + valueY + ', ' + valueR + ', ' + valueSx + ', ' + valueSy + ' , ' + valueOx + ', ' + valueOy + ', ' + valueKx + ', ' + valueKy + ')\n'
  }

  BlocklyLua.luaGenerator.graphics_present = function () {
    return 'love.graphics.present()\n'
  }

  BlocklyLua.luaGenerator.graphics_polygon = function (block) {
    const dropdownDrawmode = block.getFieldValue('DrawMode')
    const valueVertices = BlocklyLua.luaGenerator.valueToCode(block, 'vertices', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    return 'love.graphics.polygon("' + dropdownDrawmode + '", ' + valueVertices + ')\n'
  }

  BlocklyLua.luaGenerator.graphics_points = function (block) {
    const valuePoints = BlocklyLua.luaGenerator.valueToCode(block, 'points', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    return 'love.graphics.points( ' + valuePoints + ' )\n'
  }

  BlocklyLua.luaGenerator.graphics_line = function (block) {
    const valuePoints = BlocklyLua.luaGenerator.valueToCode(block, 'points', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    return 'love.graphics.line( ' + valuePoints + ' )\n'
  }

  BlocklyLua.luaGenerator.graphics_flushbatch = function () {
    return 'love.graphics.flushBatch()\n'
  }

  BlocklyLua.luaGenerator.graphics_ellipse = function (block) {
    const dropdownDrawmode = block.getFieldValue('DrawMode')
    const numberX = block.getFieldValue('x')
    const numberY = block.getFieldValue('y')
    const numberRadiusx = block.getFieldValue('radiusx')
    const numberRadiusy = block.getFieldValue('radiusy')
    const numberSegments = block.getFieldValue('segments')
    return 'love.graphics.ellipse("' + dropdownDrawmode + '", ' + numberX + ', ' + numberY + ', ' + numberRadiusx + ', ' + numberRadiusy + ', ' + numberSegments + ' )\n'
  }

  BlocklyLua.luaGenerator.graphics_drawlayer = function (block) {
    const valueTexture = BlocklyLua.luaGenerator.valueToCode(block, 'texture', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const numberLayerindex = block.getFieldValue('layerindex')
    const numberX = block.getFieldValue('x')
    const numberY = block.getFieldValue('y')
    const numberR = block.getFieldValue('r')
    const numberSx = block.getFieldValue('sx')
    const numberSy = block.getFieldValue('sy')
    const numberOx = block.getFieldValue('ox')
    const numberOy = block.getFieldValue('oy')
    const numberKx = block.getFieldValue('kx')
    const numberKy = block.getFieldValue('ky')
    return 'love.graphics.drawLayer(' + valueTexture + ', ' + numberLayerindex + ', ' + numberX + ', ' + numberY + ', ' + numberR + ', ' + numberSx + ', ' + numberSy + ' , ' + numberOx + ', ' + numberOy + ', ' + numberKx + ', ' + numberKy + ')\n'
  }

  BlocklyLua.luaGenerator.graphics_draw = function (block) {
    const valueDrawable = BlocklyLua.luaGenerator.valueToCode(block, 'drawable', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const numberX = block.getFieldValue('x')
    const numberY = block.getFieldValue('y')
    const numberR = block.getFieldValue('r')
    const numberSx = block.getFieldValue('sx')
    const numberSy = block.getFieldValue('sy')
    const numberOx = block.getFieldValue('ox')
    const numberOy = block.getFieldValue('oy')
    const numberKx = block.getFieldValue('kx')
    const numberKy = block.getFieldValue('ky')
    return 'love.graphics.draw(' + valueDrawable + ', ' + numberX + ', ' + numberY + ', ' + numberR + ', ' + numberSx + ', ' + numberSy + ' , ' + numberOx + ', ' + numberOy + ', ' + numberKx + ', ' + numberKy + ')\n'
  }

  BlocklyLua.luaGenerator.graphics_discard = function (block) {
    const valueDiscardcolor = BlocklyLua.luaGenerator.valueToCode(block, 'discardcolor', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueDiscardstencil = BlocklyLua.luaGenerator.valueToCode(block, 'discardstencil', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    return 'love.graphics.discard(' + valueDiscardcolor + ', ' + valueDiscardstencil + ' )\n'
  }

  BlocklyLua.luaGenerator.graphics_clear = function () {
    return 'love.graphics.clear()\n'
  }

  BlocklyLua.luaGenerator.graphics_circle = function (block) {
    const dropdownMode = block.getFieldValue('mode')
    const valueX = BlocklyLua.luaGenerator.valueToCode(block, 'x', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueY = BlocklyLua.luaGenerator.valueToCode(block, 'y', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueRadius = BlocklyLua.luaGenerator.valueToCode(block, 'radius', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    return 'love.graphics.circle("' + dropdownMode + '", ' + valueX + ', ' + valueY + ', ' + valueRadius + ')\n'
  }

  BlocklyLua.luaGenerator.graphics_arc = function (block) {
    const dropdownDrawmode = block.getFieldValue('drawmode')
    const numberX = block.getFieldValue('x')
    const numberY = block.getFieldValue('y')
    const numberRadius = block.getFieldValue('radius')
    const angleAngle1 = block.getFieldValue('angle1')
    const angleAngle2 = block.getFieldValue('angle2')
    const numberSegments = block.getFieldValue('segments')
    return 'love.graphics.arc("' + dropdownDrawmode + '", ' + numberX + ', ' + numberY + ', ' + numberRadius + ', ' + angleAngle1 + ', ' + angleAngle2 + ' , ' + numberSegments + ')\n'
  }

  BlocklyLua.luaGenerator.graphics_translate = function (block) {
    const valueDx = BlocklyLua.luaGenerator.valueToCode(block, 'dx', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueDy = BlocklyLua.luaGenerator.valueToCode(block, 'dy', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    return 'love.graphics.translate( ' + valueDx + ', ' + valueDy + ' )\n'
  }

  BlocklyLua.luaGenerator.graphics_transformpoint = function (block) {
    const valueGlobalx = BlocklyLua.luaGenerator.valueToCode(block, 'globalX', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueGlobaly = BlocklyLua.luaGenerator.valueToCode(block, 'globalY', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const code = '{ love.graphics.transformPoint( ' + valueGlobalx + ', ' + valueGlobaly + ' ) }'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.graphics_shear = function (block) {
    const valueKx = BlocklyLua.luaGenerator.valueToCode(block, 'kx', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueKy = BlocklyLua.luaGenerator.valueToCode(block, 'ky', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    return 'love.graphics.shear( ' + valueKx + ', ' + valueKy + ' )\n'
  }

  BlocklyLua.luaGenerator.graphics_scale = function (block) {
    const valueSx = BlocklyLua.luaGenerator.valueToCode(block, 'sx', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueSy = BlocklyLua.luaGenerator.valueToCode(block, 'sy', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    return 'love.graphics.scale( ' + valueSx + ', ' + valueSy + ' )\n'
  }

  BlocklyLua.luaGenerator.graphics_rotate = function (block) {
    const valueAngle = BlocklyLua.luaGenerator.valueToCode(block, 'angle', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    return 'love.graphics.rotate( ' + valueAngle + ' )\n'
  }

  BlocklyLua.luaGenerator.graphics_push = function () {
    return 'love.graphics.push()\n'
  }

  BlocklyLua.luaGenerator.graphics_pop = function () {
    return 'love.graphics.pop()\n'
  }

  BlocklyLua.luaGenerator.graphics_origin = function () {
    return 'love.graphics.origin()\n'
  }

  BlocklyLua.luaGenerator.graphics_inversetransformpoint = function (block) {
    const valueScreenx = BlocklyLua.luaGenerator.valueToCode(block, 'screenX', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueScreeny = BlocklyLua.luaGenerator.valueToCode(block, 'screenY', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const code = '{ love.graphics.inverseTransformPoint( ' + valueScreenx + ', ' + valueScreeny + ' ) }'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.graphics_validateshader = function (block) {
    const valueGles = BlocklyLua.luaGenerator.valueToCode(block, 'gles', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueCode = BlocklyLua.luaGenerator.valueToCode(block, 'code', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const code = '{ love.graphics.validateShader( ' + valueGles + ', ' + valueCode + ' ) }'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.graphics_newimage = function (block) {
    const textFilename = block.getFieldValue('filename')
    const code = 'love.graphics.newImage( "' + textFilename + '" )'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.graphics_getwidth = function () {
    const code = 'love.graphics.getWidth()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.graphics_getpixelwidth = function () {
    const code = 'love.graphics.getPixelWidth()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.graphics_getpixelheight = function () {
    const code = 'love.graphics.getPixelHeight()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.graphics_getpixeldimensions = function () {
    const code = '{ love.graphics.getPixelDimensions() }'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.graphics_getheight = function () {
    const code = 'love.graphics.getHeight()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.graphics_getdimensions = function () {
    const code = '{ love.graphics.getDimensions() }'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.graphics_getdpiscale = function () {
    const code = 'love.graphics.getDPIScale()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.graphics_getbackgroundcolor = function () {
    const code = '{ love.graphics.getBackgroundColor() }'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.graphics_getcolor = function () {
    const code = '{ love.graphics.getColor() }'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.graphics_isgammacorrect = function () {
    const code = 'love.graphics.isGammaCorrect()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.graphics_isactive = function () {
    const code = 'love.graphics.isActive()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.graphics_reset = function () {
    return 'love.graphics.reset()\n'
  }

  BlocklyLua.luaGenerator.graphics_iswireframe = function () {
    const code = 'love.graphics.isWireframe()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.graphics_setbackgroundcolor = function (block) {
    const numberRed = block.getFieldValue('red')
    const numberGreen = block.getFieldValue('green')
    const numberBlue = block.getFieldValue('blue')
    const numberAlpha = block.getFieldValue('alpha')
    return 'love.graphics.setBackgroundColor(' + numberRed + ', ' + numberGreen + ', ' + numberBlue + ', ' + numberAlpha + ')\n'
  }

  BlocklyLua.luaGenerator.graphics_setcolor = function (block) {
    const numberRed = block.getFieldValue('red')
    const numberGreen = block.getFieldValue('green')
    const numberBlue = block.getFieldValue('blue')
    const numberAlpha = block.getFieldValue('alpha')
    return 'love.graphics.setColor(' + numberRed + ', ' + numberGreen + ', ' + numberBlue + ', ' + numberAlpha + ')\n'
  }

  BlocklyLua.luaGenerator.graphics_setwireframe = function (block) {
    const valueEnable = BlocklyLua.luaGenerator.valueToCode(block, 'enable', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    return 'love.graphics.setWireframe(' + valueEnable + ')\n'
  }

  BlocklyLua.luaGenerator.graphics_setscissor = function (block) {
    const valueX = BlocklyLua.luaGenerator.valueToCode(block, 'x', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueY = BlocklyLua.luaGenerator.valueToCode(block, 'y', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueWidth = BlocklyLua.luaGenerator.valueToCode(block, 'width', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueHeight = BlocklyLua.luaGenerator.valueToCode(block, 'height', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    return 'love.graphics.setScissor(' + valueX + ', ' + valueY + ', ' + valueWidth + ', ' + valueHeight + ')\n'
  }

  BlocklyLua.luaGenerator.graphics_getpointsize = function () {
    const code = 'love.graphics.getPointSize()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.graphics_setpointsize = function (block) {
    const valueSize = BlocklyLua.luaGenerator.valueToCode(block, 'size', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    return 'love.graphics.setPointSize(' + valueSize + ')\n'
  }

  BlocklyLua.luaGenerator.graphics_getlinewidth = function () {
    const code = 'love.graphics.getLineWidth()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.graphics_setlinewidth = function (block) {
    const valueWidth = BlocklyLua.luaGenerator.valueToCode(block, 'width', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    return 'love.graphics.setLineWidth(' + valueWidth + ')\n'
  }

  BlocklyLua.luaGenerator.graphics_setlinestyle = function (block) {
    const dropdownStyle = block.getFieldValue('style')
    return 'love.graphics.setLineStyle("' + dropdownStyle + '")\n'
  }

  BlocklyLua.luaGenerator.graphics_setlinejoin = function (block) {
    const dropdownJoin = block.getFieldValue('join')
    return 'love.graphics.setLineJoin("' + dropdownJoin + '")\n'
  }

  BlocklyLua.luaGenerator.keyboard_settextinput = function (block) {
    const valueEnable = BlocklyLua.luaGenerator.valueToCode(block, 'enable', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    return 'love.keyboard.setTextInput(' + valueEnable + ')\n'
  }

  BlocklyLua.luaGenerator.keyboard_setkeyrepeat = function (block) {
    const valueEnable = BlocklyLua.luaGenerator.valueToCode(block, 'enable', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    return 'love.keyboard.setKeyRepeat(' + valueEnable + ')\n'
  }

  BlocklyLua.luaGenerator.keyboard_isscancodedown = function (block) {
    const textScancode = block.getFieldValue('scancode')
    const code = 'love.keyboard.isScancodeDown(' + textScancode + ')'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.keyboard_isdown = function (block) {
    const textKey = block.getFieldValue('key')
    const code = 'love.keyboard.isDown("' + textKey + '")'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.keyboard_hastextinput = function () {
    const code = 'love.keyboard.hasTextInput()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.keyboard_hasscreenkeyboard = function () {
    const code = 'love.keyboard.hasScreenKeyboard()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.keyboard_haskeyrepeat = function () {
    const code = 'love.keyboard.hasKeyRepeat()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.keyboard_getscancodefromkey = function (block) {
    const textKey = block.getFieldValue('key')
    const code = 'love.keyboard.getScancodeFromKey(' + textKey + ')'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.keyboard_getkeyfromscancode = function (block) {
    const textScancode = block.getFieldValue('scancode')
    const code = 'love.keyboard.getKeyFromScancode(' + textScancode + ')'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.touch_gettouches = function () {
    const code = 'love.touch.getTouches()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.touch_getpressure = function (block) {
    const valueId = BlocklyLua.luaGenerator.valueToCode(block, 'id', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const code = 'love.touch.getPressure(' + valueId + ')'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.touch_getposition = function (block) {
    const valueId = BlocklyLua.luaGenerator.valueToCode(block, 'id', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const code = 'love.touch.getPosition(' + valueId + ')'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.window_close = function () {
    return 'love.window.close()\n'
  }

  BlocklyLua.luaGenerator.window_getdpiscale = function () {
    const code = 'love.window.getDPIScale()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.window_getfullscreen = function () {
    const code = 'love.window.getFullscreen()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.window_getdisplayname = function (block) {
    const valueDisplayindex = BlocklyLua.luaGenerator.valueToCode(block, 'displayindex', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const code = 'love.window.getDisplayName(' + valueDisplayindex + ')'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.window_getdisplayorientation = function (block) {
    const valueDisplayindex = BlocklyLua.luaGenerator.valueToCode(block, 'displayindex', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const code = 'love.window.getDisplayOrientation( ' + valueDisplayindex + ' )'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.window_hasfocus = function () {
    const code = 'love.window.hasFocus()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.window_gettitle = function () {
    const code = 'love.window.getTitle()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.window_getposition = function () {
    const code = '{ love.window.getPosition( ) }'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.window_settitle = function (block) {
    const valueTitle = BlocklyLua.luaGenerator.valueToCode(block, 'title', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    return 'love.window.setTitle( ' + valueTitle + ' )\n'
  }

  BlocklyLua.luaGenerator.window_setposition = function (block) {
    const valueX = BlocklyLua.luaGenerator.valueToCode(block, 'x', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueY = BlocklyLua.luaGenerator.valueToCode(block, 'y', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const numberDisplayindex = block.getFieldValue('displayindex')
    return 'love.window.setPosition( ' + valueX + ', ' + valueY + ', ' + numberDisplayindex + ' )\n'
  }

  BlocklyLua.luaGenerator.window_setmode = function (block) {
    const valueWidth = BlocklyLua.luaGenerator.valueToCode(block, 'width', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueHeight = BlocklyLua.luaGenerator.valueToCode(block, 'height', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueFlags = BlocklyLua.luaGenerator.valueToCode(block, 'flags', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const code = 'love.window.setMode( ' + valueWidth + ', ' + valueHeight + ', ' + valueFlags + ' )'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.window_setfullscreen = function (block) {
    const valueFullscreen = BlocklyLua.luaGenerator.valueToCode(block, 'fullscreen', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const code = 'love.window.setFullscreen( ' + valueFullscreen + ' )'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.window_restore = function () {
    return 'love.window.restore()\n'
  }

  BlocklyLua.luaGenerator.window_minimize = function () {
    return 'love.window.minimize()\n'
  }

  BlocklyLua.luaGenerator.window_maximize = function () {
    return 'love.window.maximize()\n'
  }

  BlocklyLua.luaGenerator.window_isvisible = function () {
    const code = 'love.window.isVisible()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.window_isopen = function () {
    const code = 'love.window.isOpen()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.window_isminimized = function () {
    const code = 'love.window.isMinimized()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.window_ismaximized = function () {
    const code = 'love.window.isMaximized()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.window_hasmousefocus = function () {
    const code = 'love.window.hasMouseFocus()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.window_getdisplaycount = function () {
    const code = 'love.window.getDisplayCount()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.system_vibrate = function (block) {
    const valueSeconds = BlocklyLua.luaGenerator.valueToCode(block, 'seconds', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    return 'love.system.vibrate( ' + valueSeconds + ' )\n'
  }

  BlocklyLua.luaGenerator.system_setclipboardtext = function (block) {
    const valueText = BlocklyLua.luaGenerator.valueToCode(block, 'text', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    return 'love.system.setClipboardText( ' + valueText + ' )\n'
  }

  BlocklyLua.luaGenerator.system_openurl = function (block) {
    const valueUrl = BlocklyLua.luaGenerator.valueToCode(block, 'url', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const code = 'love.system.openURL( ' + valueUrl + ' )'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.system_getprocessorcount = function () {
    const code = 'love.system.getProcessorCount()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.system_getos = function () {
    const code = 'love.system.getOS()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.system_getclipboardtext = function () {
    const code = 'love.system.getClipboardText()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.system_hasbackgroundmusic = function () {
    const code = 'love.system.hasBackgroundMusic()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.timer_step = function () {
    const code = 'love.timer.step()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.timer_sleep = function (block) {
    const valueS = BlocklyLua.luaGenerator.valueToCode(block, 's', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    return 'love.timer.sleep( ' + valueS + ' )\n\n'
  }

  BlocklyLua.luaGenerator.timer_gettime = function () {
    const code = 'love.timer.getTime()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.timer_getfps = function () {
    const code = 'love.timer.getFPS()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.timer_getdelta = function () {
    const code = 'love.timer.getDelta()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.timer_getaveragedelta = function () {
    const code = 'love.timer.getAverageDelta()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.math_triangulate = function (block) {
    const valuePolygon = BlocklyLua.luaGenerator.valueToCode(block, 'polygon', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const code = 'love.math.triangulate( ' + valuePolygon + ' )'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.math_setrandomstate = function (block) {
    const valueState = BlocklyLua.luaGenerator.valueToCode(block, 'state', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    return 'love.math.setRandomState( ' + valueState + ' )\n'
  }

  BlocklyLua.luaGenerator.math_setrandomseed = function (block) {
    const valueSeed = BlocklyLua.luaGenerator.valueToCode(block, 'seed', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    return 'love.math.setRandomSeed( ' + valueSeed + ' )\n'
  }

  BlocklyLua.luaGenerator.math_randomnormal = function (block) {
    const valueStddev = BlocklyLua.luaGenerator.valueToCode(block, 'stddev', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueMean = BlocklyLua.luaGenerator.valueToCode(block, 'mean', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const code = 'love.math.randomNormal( ' + valueStddev + ', ' + valueMean + ' )'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.math_random = function (block) {
    const valueMin = BlocklyLua.luaGenerator.valueToCode(block, 'min', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueMax = BlocklyLua.luaGenerator.valueToCode(block, 'max', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const code = 'love.math.random(' + valueMin + ', ' + valueMax + ')'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.math_noise = function (block) {
    const valueX = BlocklyLua.luaGenerator.valueToCode(block, 'x', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const code = 'love.math.noise( ' + valueX + ' )'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.math_isconvex = function (block) {
    const valueVertices = BlocklyLua.luaGenerator.valueToCode(block, 'vertices', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const code = 'love.math.isConvex( ' + valueVertices + ' )'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.math_getrandomstate = function () {
    const code = 'love.math.getRandomState()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.math_getrandomseed = function () {
    const code = '{ love.math.getRandomSeed( ) }'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.math_newrandomgenerator = function () {
    const code = 'love.math.newRandomGenerator()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.mouse_sety = function (block) {
    const valueY = BlocklyLua.luaGenerator.valueToCode(block, 'y', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    return 'love.mouse.setY( ' + valueY + ' )\n'
  }

  BlocklyLua.luaGenerator.mouse_setx = function (block) {
    const valueX = BlocklyLua.luaGenerator.valueToCode(block, 'x', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    return 'love.mouse.setX( ' + valueX + ' )\n'
  }

  BlocklyLua.luaGenerator.mouse_setvisible = function (block) {
    const valueVisible = BlocklyLua.luaGenerator.valueToCode(block, 'visible', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    return 'love.mouse.setVisible( ' + valueVisible + ' )\n'
  }

  BlocklyLua.luaGenerator.mouse_setrelativemode = function (block) {
    const valueEnable = BlocklyLua.luaGenerator.valueToCode(block, 'enable', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    return 'love.mouse.setRelativeMode( ' + valueEnable + ' )\n'
  }

  BlocklyLua.luaGenerator.mouse_setposition = function (block) {
    const valueX = BlocklyLua.luaGenerator.valueToCode(block, 'x', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueY = BlocklyLua.luaGenerator.valueToCode(block, 'y', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    return 'love.mouse.setPosition( ' + valueX + ', ' + valueY + ' )\n'
  }

  BlocklyLua.luaGenerator.mouse_setgrabbed = function (block) {
    const valueGrab = BlocklyLua.luaGenerator.valueToCode(block, 'grab', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    return 'love.mouse.setGrabbed( ' + valueGrab + ' )\n'
  }

  BlocklyLua.luaGenerator.mouse_setcursor = function (block) {
    const valueCursor = BlocklyLua.luaGenerator.valueToCode(block, 'cursor', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    return 'love.mouse.setCursor( ' + valueCursor + ' )\n'
  }

  BlocklyLua.luaGenerator.mouse_newcursor = function (block) {
    const valueImagedata = BlocklyLua.luaGenerator.valueToCode(block, 'imageData', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueHotx = BlocklyLua.luaGenerator.valueToCode(block, 'hotx', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueHoty = BlocklyLua.luaGenerator.valueToCode(block, 'hoty', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const code = 'love.mouse.newCursor( ' + valueImagedata + ', ' + valueHotx + ', ' + valueHoty + ' )'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.mouse_isvisible = function () {
    const code = 'love.mouse.isVisible()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.mouse_isgrabbed = function () {
    const code = 'love.mouse.isGrabbed()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.mouse_isdown = function (block) {
    const valueButton = BlocklyLua.luaGenerator.valueToCode(block, 'button', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const code = 'love.mouse.isDown( ' + valueButton + ' )'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.mouse_gety = function () {
    const code = 'love.mouse.getY()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.mouse_getx = function () {
    const code = 'love.mouse.getX()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.mouse_getsystemcursor = function (block) {
    const valueCtype = BlocklyLua.luaGenerator.valueToCode(block, 'ctype', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const code = 'love.mouse.getSystemCursor( ' + valueCtype + ' )'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.mouse_getrelativemode = function () {
    const code = 'love.mouse.getRelativeMode()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.mouse_getposition = function () {
    const code = '{ love.mouse.getPosition() }'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.mouse_getcursor = function () {
    const code = 'love.mouse.getCursor()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.physics_setmeter = function (block) {
    const valueScale = BlocklyLua.luaGenerator.valueToCode(block, 'scale', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    return 'love.physics.setMeter( ' + valueScale + ' )\n'
  }

  BlocklyLua.luaGenerator.physics_newworld = function (block) {
    const valueXg = BlocklyLua.luaGenerator.valueToCode(block, 'xg', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueYg = BlocklyLua.luaGenerator.valueToCode(block, 'yg', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueSleep = BlocklyLua.luaGenerator.valueToCode(block, 'sleep', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const code = 'love.physics.newWorld( ' + valueXg + ', ' + valueYg + ', ' + valueSleep + ' )'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.physics_newwheeljoint = function (block) {
    const valueBody1 = BlocklyLua.luaGenerator.valueToCode(block, 'body1', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueBody2 = BlocklyLua.luaGenerator.valueToCode(block, 'body2', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueX = BlocklyLua.luaGenerator.valueToCode(block, 'x', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueY = BlocklyLua.luaGenerator.valueToCode(block, 'y', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueAx = BlocklyLua.luaGenerator.valueToCode(block, 'ax', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueAy = BlocklyLua.luaGenerator.valueToCode(block, 'ay', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueCollideconnected = BlocklyLua.luaGenerator.valueToCode(block, 'collideConnected', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const code = 'love.physics.newWheelJoint( ' + valueBody1 + ', ' + valueBody2 + ', ' + valueX + ', ' + valueY + ', ' + valueAx + ', ' + valueAy + ', ' + valueCollideconnected + ' )'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.physics_newweldjoint = function (block) {
    const valueBody1 = BlocklyLua.luaGenerator.valueToCode(block, 'body1', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueBody2 = BlocklyLua.luaGenerator.valueToCode(block, 'body2', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueX = BlocklyLua.luaGenerator.valueToCode(block, 'x', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueY = BlocklyLua.luaGenerator.valueToCode(block, 'y', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueCollideconnected = BlocklyLua.luaGenerator.valueToCode(block, 'collideConnected', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const code = 'love.physics.newWeldJoint( ' + valueBody1 + ', ' + valueBody2 + ', ' + valueX + ', ' + valueY + ', ' + valueCollideconnected + ' )'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.physics_newrectangleshape = function (block) {
    const valueWidth = BlocklyLua.luaGenerator.valueToCode(block, 'width', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueHeight = BlocklyLua.luaGenerator.valueToCode(block, 'height', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const code = 'love.physics.newRectangleShape( ' + valueWidth + ', ' + valueHeight + ' )'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.physics_newpolygonshape = function (block) {
    const valueVertices = BlocklyLua.luaGenerator.valueToCode(block, 'vertices', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const code = 'love.physics.newPolygonShape( ' + valueVertices + ' )'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.physics_newmousejoint = function (block) {
    const valueBody = BlocklyLua.luaGenerator.valueToCode(block, 'body', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueX = BlocklyLua.luaGenerator.valueToCode(block, 'x', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueY = BlocklyLua.luaGenerator.valueToCode(block, 'y', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const code = 'love.physics.newMouseJoint( ' + valueBody + ', ' + valueX + ', ' + valueY + ' )'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.physics_getdistance = function (block) {
    const valueFixture1 = BlocklyLua.luaGenerator.valueToCode(block, 'fixture1', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueFixture2 = BlocklyLua.luaGenerator.valueToCode(block, 'fixture2', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const code = '{ love.physics.getDistance( ' + valueFixture1 + ', ' + valueFixture2 + ' ) }'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.physics_getmeter = function () {
    const code = 'love.physics.getMeter()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.physics_newbody = function (block) {
    const valueWorld = BlocklyLua.luaGenerator.valueToCode(block, 'world', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueX = BlocklyLua.luaGenerator.valueToCode(block, 'x', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueY = BlocklyLua.luaGenerator.valueToCode(block, 'y', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const dropdownType = block.getFieldValue('type')
    const code = 'love.physics.newBody( ' + valueWorld + ', ' + valueX + ', ' + valueY + ', "' + dropdownType + '" )'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.physics_newcircleshape = function (block) {
    const valueRadius = BlocklyLua.luaGenerator.valueToCode(block, 'radius', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const code = 'love.physics.newCircleShape( ' + valueRadius + ' )'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.physics_newchainshape = function (block) {
    const valueLoop = BlocklyLua.luaGenerator.valueToCode(block, 'loop', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valuePoints = BlocklyLua.luaGenerator.valueToCode(block, 'points', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const code = 'love.physics.newChainShape( ' + valueLoop + ', ' + valuePoints + ' )'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.physics_newedgeshape = function (block) {
    const valueX1 = BlocklyLua.luaGenerator.valueToCode(block, 'x1', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueX2 = BlocklyLua.luaGenerator.valueToCode(block, 'x2', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueX3 = BlocklyLua.luaGenerator.valueToCode(block, 'x3', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueX4 = BlocklyLua.luaGenerator.valueToCode(block, 'x4', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const code = 'love.physics.newEdgeShape( ' + valueX1 + ', ' + valueX2 + ', ' + valueX3 + ', ' + valueX4 + ' )'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.physics_newfixture = function (block) {
    const valueBody = BlocklyLua.luaGenerator.valueToCode(block, 'body', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueShape = BlocklyLua.luaGenerator.valueToCode(block, 'shape', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueDensity = BlocklyLua.luaGenerator.valueToCode(block, 'density', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const code = 'love.physics.newFixture( ' + valueBody + ', ' + valueShape + ', ' + valueDensity + ' )'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.audio_setdistancemodel = function (block) {
    const dropdownModel = block.getFieldValue('model')
    return 'love.audio.setDistanceModel( "' + dropdownModel + '" )\n'
  }

  BlocklyLua.luaGenerator.audio_getdistancemodel = function () {
    const code = 'love.audio.getDistanceModel()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.audio_setdopplerscale = function (block) {
    const valueScale = BlocklyLua.luaGenerator.valueToCode(block, 'scale', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    return 'love.audio.setDopplerScale( ' + valueScale + ' )\n'
  }

  BlocklyLua.luaGenerator.audio_seteffect = function (block) {
    const valueName = BlocklyLua.luaGenerator.valueToCode(block, 'name', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueSettings = BlocklyLua.luaGenerator.valueToCode(block, 'settings', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    return 'love.audio.setEffect(' + valueName + ', ' + valueSettings + ')\n'
  }

  BlocklyLua.luaGenerator.audio_setmixwithsystem = function (block) {
    const valueMix = BlocklyLua.luaGenerator.valueToCode(block, 'mix', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const code = 'love.audio.setMixWithSystem( ' + valueMix + ' )'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.audio_setorientation = function (block) {
    const valueFx = BlocklyLua.luaGenerator.valueToCode(block, 'fx', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueFy = BlocklyLua.luaGenerator.valueToCode(block, 'fy', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueFz = BlocklyLua.luaGenerator.valueToCode(block, 'fz', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueUx = BlocklyLua.luaGenerator.valueToCode(block, 'ux', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueUy = BlocklyLua.luaGenerator.valueToCode(block, 'uy', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueUz = BlocklyLua.luaGenerator.valueToCode(block, 'uz', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    return 'love.audio.setOrientation( ' + valueFx + ', ' + valueFy + ', ' + valueFz + ', ' + valueUx + ', ' + valueUy + ', ' + valueUz + ' )\n'
  }

  BlocklyLua.luaGenerator.audio_setposition = function (block) {
    const valueX = BlocklyLua.luaGenerator.valueToCode(block, 'x', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueY = BlocklyLua.luaGenerator.valueToCode(block, 'y', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueZ = BlocklyLua.luaGenerator.valueToCode(block, 'z', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    return 'love.audio.setPosition( ' + valueX + ', ' + valueY + ', ' + valueZ + ' )\n'
  }

  BlocklyLua.luaGenerator.audio_setvelocity = function (block) {
    const valueX = BlocklyLua.luaGenerator.valueToCode(block, 'x', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueY = BlocklyLua.luaGenerator.valueToCode(block, 'y', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueZ = BlocklyLua.luaGenerator.valueToCode(block, 'z', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    return 'love.audio.setVelocity( ' + valueX + ', ' + valueY + ', ' + valueZ + ' )\n'
  }

  BlocklyLua.luaGenerator.audio_setvolume = function (block) {
    const numberVolume = block.getFieldValue('volume')
    return 'love.audio.setVolume( ' + numberVolume + ' )\n'
  }

  BlocklyLua.luaGenerator.audio_stop = function () {
    return 'love.audio.stop()\n'
  }

  BlocklyLua.luaGenerator.audio_pause = function () {
    const code = 'love.audio.pause()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.audio_newsource = function (block) {
    const textFilename = block.getFieldValue('filename')
    const dropdownType = block.getFieldValue('type')
    const code = 'love.audio.newSource( ' + textFilename + ', "' + dropdownType + '" )'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.audio_iseffectssupported = function () {
    const code = 'love.audio.isEffectsSupported()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.audio_getvolume = function () {
    const code = 'love.audio.getVolume()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.audio_getvelocity = function () {
    const code = '{ love.audio.getVelocity() }'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.audio_getrecordingdevices = function () {
    const code = 'love.audio.getRecordingDevices()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.audio_getposition = function () {
    const code = '{ love.audio.getPosition() }'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.audio_getorientation = function () {
    const code = '{ love.audio.getOrientation() }'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.audio_getmaxsourceeffects = function () {
    const code = 'love.audio.getMaxSourceEffects()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.audio_getmaxsceneeffects = function () {
    const code = 'love.audio.getMaxSceneEffects()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.audio_geteffect = function (block) {
    const valueName = BlocklyLua.luaGenerator.valueToCode(block, 'name', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const code = 'love.audio.getEffect(' + valueName + ')'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.audio_getdopplerscale = function () {
    const code = 'love.audio.getDopplerScale()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.audio_getactivesourcecount = function () {
    const code = 'love.audio.getActiveSourceCount()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.audio_getactiveeffects = function () {
    const code = 'love.audio.getActiveEffects()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.filesystem_append = function (block) {
    const valueName = BlocklyLua.luaGenerator.valueToCode(block, 'name', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueData = BlocklyLua.luaGenerator.valueToCode(block, 'data', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueSize = BlocklyLua.luaGenerator.valueToCode(block, 'size', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const code = '{ love.filesystem.append( ' + valueName + ', ' + valueData + ', ' + valueSize + ' ) }'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.filesystem_aresymlinksenabled = function () {
    const code = 'love.filesystem.areSymlinksEnabled()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.filesystem_createdirectory = function (block) {
    const valueName = BlocklyLua.luaGenerator.valueToCode(block, 'name', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const code = 'love.filesystem.createDirectory( ' + valueName + ' )\n'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.filesystem_getdirectoryitems = function (block) {
    const valueName = BlocklyLua.luaGenerator.valueToCode(block, 'name', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const code = 'love.filesystem.getDirectoryItems( ' + valueName + ' )\n'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.filesystem_getidentity = function () {
    const code = 'love.filesystem.getIdentity()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.filesystem_getinfo = function (block) {
    const textPath = block.getFieldValue('path')
    const dropdownFiltertype = block.getFieldValue('filtertype')
    const code = 'love.filesystem.getInfo( ' + textPath + ', "' + dropdownFiltertype + '" )'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.filesystem_getrequirepath = function () {
    const code = 'love.filesystem.getRequirePath()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.filesystem_getrealdirectory = function (block) {
    const textFilepath = block.getFieldValue('filepath')
    const code = 'love.filesystem.getRealDirectory( ' + textFilepath + ' )\n'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.filesystem_getsavedirectory = function () {
    const code = 'love.filesystem.getSaveDirectory()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.filesystem_getsource = function () {
    const code = 'love.filesystem.getSource()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.filesystem_getuserdirectory = function () {
    const code = 'love.filesystem.getUserDirectory()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.filesystem_getworkingdirectory = function () {
    const code = 'love.filesystem.getWorkingDirectory()'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.filesystem_init = function (block) {
    const valueAppname = BlocklyLua.luaGenerator.valueToCode(block, 'appname', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    return 'love.filesystem.init( ' + valueAppname + ' )\n'
  }

  BlocklyLua.luaGenerator.filesystem_lines = function (block) {
    const textName = block.getFieldValue('name')
    const code = 'love.filesystem.lines( ' + textName + ' )\n'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.filesystem_load = function (block) {
    const textName = block.getFieldValue('name')
    const code = '{ love.filesystem.load( ' + textName + ' ) }'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.filesystem_mount = function (block) {
    const valueArchive = BlocklyLua.luaGenerator.valueToCode(block, 'archive', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueMountpoint = BlocklyLua.luaGenerator.valueToCode(block, 'mountpoint', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueAppendtopath = BlocklyLua.luaGenerator.valueToCode(block, 'appendToPath', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const code = 'love.filesystem.mount( ' + valueArchive + ', ' + valueMountpoint + ', ' + valueAppendtopath + ' )'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.filesystem_newfile = function (block) {
    const textName = block.getFieldValue('name')
    const code = 'love.filesystem.newFile( ' + textName + ' )\n'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.filesystem_read = function (block) {
    const textName = block.getFieldValue('name')
    const valueSize = BlocklyLua.luaGenerator.valueToCode(block, 'size', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const code = '{ love.filesystem.read( ' + textName + ', ' + valueSize + ' ) }\n'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.filesystem_remove = function (block) {
    const textName = block.getFieldValue('name')
    const code = 'love.filesystem.remove( ' + textName + ' )'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.filesystem_setidentity = function (block) {
    const textName = block.getFieldValue('name')
    const valueAppendtopath = BlocklyLua.luaGenerator.valueToCode(block, 'appendToPath', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    return 'love.filesystem.setIdentity( ' + textName + ', ' + valueAppendtopath + ' )\n'
  }

  BlocklyLua.luaGenerator.filesystem_setrequirepath = function (block) {
    const textPaths = block.getFieldValue('paths')
    return 'love.filesystem.setRequirePath( ' + textPaths + ' )\n'
  }

  BlocklyLua.luaGenerator.filesystem_setsource = function (block) {
    const textPath = block.getFieldValue('path')
    return 'love.filesystem.setSource( ' + textPath + ' )\n'
  }

  BlocklyLua.luaGenerator.filesystem_setsymlinksenabled = function (block) {
    const valueEnable = BlocklyLua.luaGenerator.valueToCode(block, 'enable', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    return 'love.filesystem.setSymlinksEnabled( ' + valueEnable + ' )\n'
  }

  BlocklyLua.luaGenerator.filesystem_unmount = function (block) {
    const textArchive = block.getFieldValue('archive')
    const code = 'love.filesystem.unmount( ' + textArchive + ' )'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.filesystem_write = function (block) {
    const textName = block.getFieldValue('name')
    const valueData = BlocklyLua.luaGenerator.valueToCode(block, 'data', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const valueSize = BlocklyLua.luaGenerator.valueToCode(block, 'size', BlocklyLua.luaGenerator.ORDER_ATOMIC)
    const code = '{ love.filesystem.write( ' + textName + ', ' + valueData + ', ' + valueSize + ' ) }'
    return [code, BlocklyLua.luaGenerator.ORDER_NONE]
  }

  BlocklyLua.luaGenerator.forBlock['shebang'] = function(block) {
    return block.getFieldValue("shebang_context") + "\n";
  }

  BlocklyLua.luaGenerator.forBlock['procedures_ifreturn'] = function(block) {
    const value = BlocklyLua.luaGenerator.valueToCode(block, 'VALUE', BlocklyLua.luaGenerator.ORDER_ATOMIC);
    return 'return ' + value + '\n';
  }

  BlocklyLua.luaGenerator.forBlock["comment"] = function (block) {
    return '--' + block.getFieldValue('COMMENT_CONTEXT').toString() + '\n'
  }

  BlocklyLua.luaGenerator.forBlock["local_variable"] = function (block) {
    const argument0 = BlocklyLua.luaGenerator.valueToCode(block, 'TO', BlocklyLua.luaGenerator.ORDER_NONE)
    const variable = BlocklyLua.luaGenerator.getVariableName(block.getFieldValue('VAR'))
    return 'local ' + variable + ' = ' + argument0 + "\n"
  }

  BlocklyLua.luaGenerator.forBlock["lists_create_with"] = function (block) {
    const elements = new Array(block.itemCount_);
    for (let i = 0; i < block.itemCount_; i++) {
      elements[i] =
          BlocklyLua.luaGenerator.valueToCode(block, 'ADD' + i, BlocklyLua.luaGenerator.ORDER_NONE) || 'nil';
    }
    const code = '{' + elements.join(', ') + '}';
    return [code, BlocklyLua.luaGenerator.ORDER_HIGH];
  }
}

module.exports = registerBlocks
