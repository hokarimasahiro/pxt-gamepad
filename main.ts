/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org/blocks/custom
 */

//% weight=100 color=#0fbc11 icon="\uf11b"
enum GamepadButton {
    //% block="Up"
    Up = EventBusSource.MICROBIT_ID_IO_P13,
    //% block="Left"
    Left = EventBusSource.MICROBIT_ID_IO_P15,
    //% block="Down"
    Down = EventBusSource.MICROBIT_ID_IO_P8,
    //% block="Right"
    Right = EventBusSource.MICROBIT_ID_IO_P12
}
enum GamepadEvents {
    //% block="pressed"
    Down = EventBusValue.MICROBIT_BUTTON_EVT_CLICK,
    //% block="released"
    Up = EventBusValue.MICROBIT_BUTTON_EVT_UP
}
namespace Gamepad {
    let initflag: number = 0
    function pininit(): void {
        pins.setPull(DigitalPin.P8, PinPullMode.PullNone)
        pins.setPull(DigitalPin.P12, PinPullMode.PullNone)
        pins.setPull(DigitalPin.P13, PinPullMode.PullNone)
        pins.setPull(DigitalPin.P15, PinPullMode.PullNone)
        pins.setEvents(DigitalPin.P8, PinEventType.Edge)
        pins.setEvents(DigitalPin.P12, PinEventType.Edge)
        pins.setEvents(DigitalPin.P13, PinEventType.Edge)
        pins.setEvents(DigitalPin.P15, PinEventType.Edge)
        initflag = 1
    }
    /**
     * TODO: ボタンの状態を通知する
     * @param Button ボタン。, eg: Down Allow
     */
    //% blockId=Gamepad_Button_Sence block="Button|%Button|Is Pressed"
    export function ButtonState(Button: GamepadButton): boolean {
        if (initflag == 0) pininit()
        return (pins.digitalReadPin(Button >> 0) == 0) ? true : false
    }
    /**
     * TODO: ボタンが押されたとき
     * @param Button ボタン。, eg: Down Allow
     * @param Event きっかけ。, eg: pressed
     * @param handler 処理。
     */
    //% blockId=Gamepad_create_event block="on Button|%Button|Is %Event"
    export function onEvent(Button: GamepadButton, Event: GamepadEvents, handler: Action) {
        if (initflag == 0) pininit()
        control.onEvent(Button >> 0, Event >> 0, handler);
    }
}
