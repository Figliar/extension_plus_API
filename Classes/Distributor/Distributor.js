/**
 * Author: René Rešetár
 * Email: xreset00@stud.fit.vutbr.cz
 *
 * Distributes nodes to their corresponding subclasses based on node type.
 *
 */

class Distributor {

    /**
     * Constructs a new Distributor with empty ping to be filled.
     * Initializes various maps, sets, and constants used for block generation.
     */
    constructor() {
        this.nodeToSubclassMap = {};
        this.customFunctions = {};
        this.functionsOnlyDef = this.setFunctionsOnlyDef();
        this.functionsOnlyCall = this.setFunctionsOnlyCall();
        this.functionsReturnLOVE = this.setFunctionsReturnLOVE();
        this.functionsReturn = this.setFunctionsReturn();
        this.constants = {
            "math.pi": ["math_constant", "PI", "CONSTANT"],
            "math.huge": ["math_constant", "INFINITY", "CONSTANT"],
        };
        this.ignore = this.setIgnore();
    }


    /**
     * Returns a node object of the appropriate subclass based on the given node type.
     * @param workspace
     * @param {Node} node The node to get the subclass for.
     * @param {Blockly.Block} lastBlock The last block generated.
     * @returns {Node} The node object of the appropriate subclass.
     * @throws {Error} If no subclass is found for the given node type.
     */
    getNodeObject(workspace, node, lastBlock) {
        const Subclass = this.nodeToSubclassMap[node.type];
        if (Subclass) {
            return new Subclass(workspace, node, this, lastBlock);
        } else {
            throw new Error(`No subclass found for node type: ${node.type}`);
        }
    }


    /**
     * Registers a subclass for a given node type.
     * @param {string} nodeType The type of the node.
     * @param {Node} Subclass The subclass to register.
     */
    registerSubclass(nodeType, Subclass) {
        this.nodeToSubclassMap[nodeType] = Subclass;
    }


    /**
     * Setting function to initialize parameter functionsOnlyDef
     * These callback functions require mapping to their block definition
     * @returns {{"function_name": "corresponding_block_name"}}
     */
    setFunctionsOnlyDef(){
        return {
            "love.keypressed": "love_keypressed",
            "love.keyreleased": "love_keyreleased",
            "love.mousepressed": "love_mousepressed",
            "love.mousereleased": "love_mousereleased",
            "love.load": "love_load",
            "love.update": "love_update",
            "love.draw": "love_draw",
            "love.quit": "love_quit",
            "love.focus": "love_focus",
            "love.visible": "love_visible",
            "love.resize": "love_resize",
            "love.textinput": "love_textinput",
            "love.mousemoved": "love_mousemoved",
            "love.wheelmoved": "love_wheelmoved",
            "love.mousefocus": "love_mousefocus",
            "love.textedited": "love_textedited",
            "love.directorydropped": "love_directorydropped",
            "love.filedropped": "love_filedropped",
            "love.displayrotated": "love_displayrotated",
            "love.gamepadaxis": "love_gamepadaxis",
            "love.gamepadpressed": "love_gamepadpressed",
            "love.gamepadreleased": "love_gamepadreleased",
            "love.joystickadded": "love_joystickadded",
            "love.joystickaxis": "love_joystickaxis",
            "love.joystickhat": "love_joystickhat",
            "love.joystickpressed": "love_joystickpressed",
            "love.joystickreleased": "love_joystickreleased",
            "love.threaderror": "love_threaderror",
            "love.errorhandler": "love_errorhandler",
            "love.joystickremoved": "love_joystickremoved",
            "love.lowmemory": "love_lowmemory",
            "love.run": "love_run",
            "love.touchmoved": "love_touchmoved",
            "love.touchpressed": "love_touchpressed",
            "love.touchreleased": "love_touchreleased",
        };
    }


    /**
     * Setting function to initialize parameter functionsOnlyCall.
     * These functions require mapping to their block definition
     * @returns {{"function_name": "corresponding_block_name"}}
     */
    setFunctionsOnlyCall(){
        return {
            "love.graphics.setNewFont": "graphics_setnewfont",
            "love.graphics.stencil": "graphics_stencil",
            "love.graphics.rectangle": "graphics_rectangle",
            "love.graphics.printf": "graphics_printf",
            "love.graphics.print": "graphics_print",
            "love.graphics.present": "graphics_present",
            "love.graphics.polygon": "graphics_polygon",
            "love.graphics.points": "graphics_points",
            "love.graphics.line": "graphics_line",
            "love.graphics.flushBatch": "graphics_flushbatch",
            "love.graphics.ellipse": "graphics_ellipse",
            "love.graphics.drawLayer": "graphics_drawlayer",
            "love.graphics.draw": "graphics_draw",
            "love.graphics.discard": "graphics_discard",
            "love.graphics.clear": "graphics_clear",
            "love.graphics.circle": "graphics_circle",
            "love.graphics.arc": "graphics_arc",
            "love.graphics.translate": "graphics_translate",
            "love.graphics.shear": "graphics_shear",
            "love.graphics.scale": "graphics_scale",
            "love.graphics.rotate": "graphics_rotate",
            "love.graphics.push": "graphics_push",
            "love.graphics.pop": "graphics_pop",
            "love.graphics.origin": "graphics_origin",
            "love.graphics.reset": "graphics_reset",
            "love.graphics.setBackgroundColor": "graphics_setbackgroundcolor",
            "love.graphics.setColor": "graphics_setcolor",
            "love.graphics.setWireframe": "graphics_setwireframe",
            "love.graphics.setScissor": "graphics_setscissor",
            "love.graphics.setPointSize": "graphics_setpointsize",
            "love.graphics.setLineWidth": "graphics_setlinewidth",
            "love.graphics.setLineStyle": "graphics_setlinestyle",
            "love.graphics.setLineJoin": "graphics_setlinejoin",

            "love.keyboard.setTextInput": "keyboard_settextinput",
            "love.keyboard.setKeyRepeat": "keyboard_setkeyrepeat",

            "love.window.setTitle": "window_settitle",
            "love.window.setPosition": "window_setposition",
            "love.window.restore": "window_restore",
            "love.window.minimize": "window_minimize",
            "love.window.maximize": "window_maximize",

            "love.system.vibrate": "system_vibrate",
            "love.system.setClipboardText": "system_setclipboardtext",

            "love.timer.sleep": "timer_sleep",

            "love.math.setRandomState": "math_setrandomstate",
            "love.math.setRandomSeed": "math_setrandomseed",

            "love.mouse.setY": "mouse_sety",
            "love.mouse.setX": "mouse_setx",
            "love.mouse.setVisible": "mouse_setvisible",
            "love.mouse.setRelativeMode": "mouse_setrelativemode",
            "love.mouse.setPosition": "mouse_setposition",
            "love.mouse.setGrabbed": "mouse_setgrabbed",
            "love.mouse.setCursor": "mouse_setcursor",

            "love.physics.setMeter": "physics_setmeter",

            "love.audio.setDistanceModel": "audio_setdistancemodel",
            "love.audio.setDopplerScale": "audio_setdopplerscale",
            "love.audio.setEffect": "audio_seteffect",
            "love.audio.setOrientation": "audio_setorientation",
            "love.audio.setPosition": "audio_setposition",
            "love.audio.setVelocity": "audio_setvelocity",
            "love.audio.setVolume": "audio_setvolume",
            "love.audio.stop": "audio_stop",

            "love.filesystem.init": "filesystem_init",
            "love.filesystem.setIdentity": "filesystem_setidentity",
            "love.filesystem.setRequirePath": "filesystem_setrequirepath",
            "love.filesystem.setSource": "filesystem_setsource",
            "love.filesystem.setSymlinksEnabled": "filesystem_setsymlinksenabled",

            "print": "text_print",
            "table.remove": "table_remove",
            "table.insert": "lists_setIndex",
        };
    }


    /**
     * Setting function to initialize parameter functionsReturnLOVE
     * These functions require mapping to their block definition
     * @returns {{"function_name": "corresponding_block_name"}}
     */
    setFunctionsReturnLOVE(){
        return {
            "love.graphics.transformPoint": "graphics_transformpoint",
            "love.graphics.inverseTransformPoint": "graphics_inversetransformpoint",
            "love.graphics.validateShader": "graphics_validateshader",
            "love.graphics.newImage": "graphics_newimage",
            "love.graphics.getWidth": "graphics_getwidth",
            "love.graphics.getPixelWidth": "graphics_getpixelwidth",
            "love.graphics.getPixelHeight": "graphics_getpixelheight",
            "love.graphics.getHeight": "graphics_getheight",
            "love.graphics.getDimensions": "graphics_getdimensions",
            "love.graphics.getDPIScale": "graphics_getdpiscale",
            "love.graphics.getBackgroundColor": "graphics_getbackgroundcolor",
            "love.graphics.getColor": "graphics_getcolor",
            "love.graphics.isGammaCorrect": "graphics_isgammacorrect",
            "love.graphics.isActive": "graphics_isactive",
            "love.graphics.isWireframe": "graphics_iswireframe",
            "love.graphics.getPointSize": "graphics_getpointsize",
            "love.graphics.getLineWidth": "graphics_getlinewidth",

            "love.keyboard.isScancodeDown": "keyboard_isscancodedown",
            "love.keyboard.isDown": "keyboard_isdown",
            "love.keyboard.hasTextInput": "keyboard_hastextinput",
            "love.keyboard.hasScreenKeyboard": "keyboard_hasscreenkeyboard",
            "love.keyboard.hasKeyRepeat": "keyboard_haskeyrepeat",
            "love.keyboard.getScancodeFromKey": "keyboard_getscancodefromkey",
            "love.keyboard.getKeyFromScancode": "keyboard_getkeyfromscancode",

            "love.touch.getTouches": "touch_gettouches",
            "love.touch.getPressure": "touch_getpressure",
            "love.touch.getPosition": "touch_getposition",

            "love.window.close": "window_close",
            "love.window.getDPIScale": "window_getdpiscale",
            "love.window.getFullscreen": "window_getfullscreen",
            "love.window.getDisplayName": "window_getdisplayname",
            "love.window.getDisplayOrientation": "window_getdisplayorientation",
            "love.window.hasFocus": "window_hasfocus",
            "love.window.getTitle": "window_gettitle",
            "love.window.getPosition": "window_getposition",

            "love.window.setMode": "window_setmode",
            "love.window.setFullscreen": "window_setfullscreen",

            "love.window.isVisible": "window_isvisible",
            "love.window.isOpen": "window_isopen",
            "love.window.isMinimized": "window_isminimized",
            "love.window.isMaximized": "window_ismaximized",
            "love.window.hasMouseFocus": "window_hasmousefocus",
            "love.window.getDisplayCount": "window_getdisplaycount",

            "love.system.openURL": "system_openurl",
            "love.system.getProcessorCount": "system_getprocessorcount",
            "love.system.getOS": "system_getos",
            "love.system.getClipboardText": "system_getclipboardtext",
            "love.system.hasBackgroundMusic": "system_hasbackgroundmusic",

            "love.timer.step": "timer_step",
            "love.timer.getTime": "timer_gettime",
            "love.timer.getFPS": "timer_getfps",
            "love.timer.getDelta": "timer_getdelta",
            "love.timer.getAverageDelta": "timer_getaveragedelta",

            "love.math.triangulate": "math_triangulate",
            "love.math.randomNormal": "math_randomnormal",
            "love.math.random": "math_random",
            "love.math.noise": "math_noise",
            "love.math.isConvex": "math_isconvex",
            "love.math.getRandomState": "math_getrandomstate",
            "love.math.getRandomSeed": "math_getrandomseed",
            "love.math.newRandomGenerator": "math_newrandomgenerator",

            "love.mouse.newCursor": "mouse_newcursor",
            "love.mouse.isVisible": "mouse_isvisible",
            "love.mouse.isGrabbed": "mouse_isgrabbed",
            "love.mouse.isDown": "mouse_isdown",
            "love.mouse.getY": "mouse_gety",
            "love.mouse.getX": "mouse_getx",
            "love.mouse.getSystemCursor": "mouse_getsystemcursor",
            "love.mouse.getRelativeMode": "mouse_getrelativemode",
            "love.mouse.getPosition": "mouse_getposition",
            "love.mouse.getCursor": "mouse_getcursor",

            "love.physics.newWorld": "physics_newworld",
            "love.physics.newWheelJoint": "physics_newwheeljoint",
            "love.physics.newWeldJoint": "physics_newweldjoint",
            "love.physics.newRectangleShape": "physics_newrectangleshape",
            "love.physics.newPolygonShape": "physics_newpolygonshape",
            "love.physics.newMouseJoint": "physics_newmousejoint",
            "love.physics.getDistance": "physics_getdistance",
            "love.physics.getMeter": "physics_getmeter",
            "love.physics.newBody": "physics_newbody",
            "love.physics.newCircleShape": "physics_newcircleshape",
            "love.physics.newChainShape": "physics_newchainshape",
            "love.physics.newEdgeShape": "physics_newedgeshape",
            "love.physics.newFixture": "physics_newfixture",

            "love.audio.getDistanceModel": "audio_getdistancemodel",
            "love.audio.setMixWithSystem": "audio_setmixwithsystem",
            "love.audio.newSource": "audio_newsource",
            "love.audio.isEffectsSupported": "audio_iseffectssupported",
            "love.audio.getVolume": "audio_getvolume",
            "love.audio.getVelocity": "audio_getvelocity",
            "love.audio.getRecordingDevices": "audio_getrecordingdevices",
            "love.audio.getPosition": "audio_getposition",
            "love.audio.getOrientation": "audio_getorientation",
            "love.audio.getMaxSourceEffects": "audio_getmaxsourceeffects",
            "love.audio.getMaxSceneEffects": "audio_getmaxsceneeffects",
            "love.audio.getEffect": "audio_geteffect",
            "love.audio.getDopplerScale": "audio_getdopplerscale",
            "love.audio.getActiveSourceCount": "audio_getactivesourcecount",
            "love.audio.getActiveEffects": "audio_getactiveeffects",
            "love.audio.pause": "audio_pause",

            "love.filesystem.append": "filesystem_append",
            "love.filesystem.areSymlinksEnabled": "filesystem_aresymlinksenabled",
            "love.filesystem.createDirectory": "filesystem_createdirectory",
            "love.filesystem.getDirectoryItems": "filesystem_getdirectoryitems",
            "love.filesystem.getIdentity": "filesystem_getidentity",
            "love.filesystem.getInfo": "filesystem_getinfo",
            "love.filesystem.getRequirePath": "filesystem_getrequirepath",
            "love.filesystem.getRealDirectory": "filesystem_getrealdirectory",
            "love.filesystem.getSaveDirectory": "filesystem_getsavedirectory",
            "love.filesystem.getSource": "filesystem_getsource",
            "love.filesystem.getUserDirectory": "filesystem_getuserdirectory",
            "love.filesystem.getWorkingDirectory": "filesystem_getworkingdirectory",
            "love.filesystem.lines": "filesystem_lines",
            "love.filesystem.load": "filesystem_load",
            "love.filesystem.mount": "filesystem_mount",
            "love.filesystem.newFile": "filesystem_newfile",
            "love.filesystem.read": "filesystem_read",
            "love.filesystem.remove": "filesystem_remove",
            "love.filesystem.unmount": "filesystem_unmount",
            "love.filesystem.write": "filesystem_unmount",

            "create_list_repeated": "lists_repeat",
        }
    };


    /**
     * Setting function to initialize parameter functionsReturn.
     * These functions require mapping to their block definition
     * and specific approach for correct parameter initialization
     * @returns {{"function_name": ["corresponding_block_name", "setter_value", "setter_name"]}}
     */
    setFunctionsReturn() {
        return {
            "math.sqrt": ["math_single", "ROOT", "OP"],
            "math.abs": ["math_single", "ABS", "OP"],
            "math.log": ["math_single", "LN", "OP"],
            "math.exp": ["math_single", "EXP", "OP"],

            "math.sin": ["math_trig", "SIN", "OP"],
            "math.cos": ["math_trig", "COS", "OP"],
            "math.tan": ["math_trig", "TAN", "OP"],
            "math.asin": ["math_trig", "ASIN", "OP"],
            "math.acos": ["math_trig", "ACOS", "OP"],
            "math.atan": ["math_trig", "ATAN", "OP"],

            "math.floor": ["math_round", "ROUND", "OP"],
            "math.ceil": ["math_round", "ROUNDUP", "OP"],

            "math_sum": ["math_on_list", "SUM", "OP"],
            "math_min": ["math_on_list", "MIN", "OP"],
            "math_max": ["math_on_list", "MAX", "OP"],
            "math_average": ["math_on_list", "AVERAGE", "OP"],
            "math_median": ["math_on_list", "MEDIAN", "OP"],
            "math_modes": ["math_on_list", "MODE", "OP"],
            "math_standard_deviation": ["math_on_list", "STD_DEV", "OP"],
            "math_random_list": ["math_on_list", "RANDOM", "OP"],

            "math.random": [], //"ZALEZI NA PARAMETROCH"
            "math.deg": ["math_atan2", "vola sa ako math.deg(math.atan2())"],
            "math.atan2": ["math_atan2", "ZALEZI NA PARAMETROCH"],
            "math_isPrime": ["math_number_property", "PRIME", "PROPERTY"],

            "firstIndexOf": ["text_indexOf", "FIRST", "END"],
            "lastIndexOf": ["text_indexOf", "LAST", "END"],
            "string.sub": ["text_getSubstring", "LAST", "AT1"],
            // "text_random_letter": ["text_getSubstring"],
            "text_random_letter": ["text_charAt", "RANDOM", "WHERE"],
            "string.upper": ["text_changeCase", "UPPERCASE", "CASE"],
            "string.lower": ["text_changeCase", "LOWERCASE", "CASE"],
            "text_titlecase": ["text_changeCase", "TITLECASE", "CASE"],
            "string.gsub": ["text_trim", "BOTH", "MODE"],
            "text_prompt": ["text_prompt", "TEXT", "TYPE"],
            "tonumber": ["text_prompt", "NUMBER", "TYPE"],

            "first_index": ["lists_indexOf", "FIRST", "END"],
            "last_index": ["lists_indexOf", "LAST", "END"],
            "table.remove": ["lists_getIndex", "GET_REMOVE", "MODE"],

            "list_sublist_from_start_from_start": ["lists_getSublist", "FROM_START", "WHERE1", "FROM_START", "WHERE2"],
            "list_sublist_from_end_from_start": ["lists_getSublist", "FROM_END", "WHERE1", "FROM_START", "WHERE2"],
            "list_sublist_first_from_start": ["lists_getSublist", "FIRST", "WHERE1", "FROM_START", "WHERE2"],
            "list_sublist_first_from_end": ["lists_getSublist", "FIRST", "WHERE1", "FROM_END", "WHERE2"],
            "list_sublist_first_last": ["lists_getSublist", "FIRST", "WHERE1", "LAST", "WHERE2"],
            "list_sublist_from_end_from_end": ["lists_getSublist", "FROM_END", "WHERE1", "FROM_END", "WHERE2"],
            "list_sublist_from_end_last": ["lists_getSublist", "FROM_END", "WHERE1", "LAST", "WHERE2"],
            "list_sublist_from_start_from_end": ["lists_getSublist", "FROM_START", "WHERE1", "FROM_END", "WHERE2"],
            "list_sublist_from_start_last": ["lists_getSublist", "FROM_START", "WHERE1", "LAST", "WHERE2"],

            "list_string_split": ["lists_split", "SPLIT", "MODE"],
            "table.concat": ["lists_split", "JOIN", "MODE"],
            "list_sort": ["lists_sort", "", "DIRECTION"],

            "math.min": ["math_constrain"],
            "math.rad": ["IGNORE"]
        };
    }


    /**
     * Setting function to initialize ignore parameter.
     * Functions with these names are ignored when we detect their definition.
     * @returns {string[]}
     */
    setIgnore(){
        return ["math_min", "math_max", "math_sum", "math_average",
            "math_median", "math_modes", "math_standard_deviation", "math_random_item",
            "firstIndexOf", "lastIndexOf", "text_random_letter", "text_titlecase",
            "text_prompt", "create_list_repeated", "first_index", "last_index",
            "list_sublist_from_start_from_start", "list_sublist_from_end_from_start",
            "list_sublist_first_from_start", "list_sublist_first_from_end",
            "function list_sublist_first_last", "list_sublist_from_end_from_end",
            "list_sublist_from_end_last", "list_sublist_from_start_from_end",
            "list_sublist_from_start_last", "list_string_split", "list_sort",
            "list_sublist_first_last", "math_isPrime", "math_random_list"];
    }
}

module.exports = Distributor
