import joplin from 'api';
import {setUpPlugin} from "./repeater"

joplin.plugins.register({
	onStart: setUpPlugin
});
