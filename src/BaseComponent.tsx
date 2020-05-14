import React, { Component} from 'react'
import { ThemeContext } from 'react-navigation';

export default class BaseComponent<P = {}, S = {}, SS = any> extends Component<P, S, SS> {

    static contextType = ThemeContext
    context!: React.ContextType<typeof ThemeContext>

}
