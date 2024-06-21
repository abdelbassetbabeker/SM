import React from 'react';
import { Label, Menu, Tab } from 'semantic-ui-react';
import Courses from './Courses';
import Levels from './levels/Levels';
import Plans from './plans/Plans';
import Classes from './classes/Classes';

const Main = () => {

    const panes = [

        {
            menuItem: (
                <Menu.Item key='Courses'>
                    <div className='flex gap-3 '>
                        {courseIcon}
                        <p>
                            Courses
                        </p>
                    </div>
                </Menu.Item >
            ),
            render: () => <Tab.Pane as='div'><Courses /></Tab.Pane>,
        },
        {
            menuItem: (
                <Menu.Item key='Levels'>
                    <div className='flex gap-3 '>
                        {levelsIcon}
                        <p>
                            Levels
                        </p>
                    </div>
                </Menu.Item >
            ),
            render: () => <Tab.Pane as='div' >
                <Levels />
            </Tab.Pane>,
        },
        {
            menuItem: (
                <Menu.Item key='Plans'>
                    <div className='flex gap-3 '>
                        {plansIcon}
                        <p>
                            Plans
                        </p>
                    </div>
                </Menu.Item >
            ),
            render: () => <Tab.Pane as='div' >
                <Plans />
            </Tab.Pane>,
        },
        {
            menuItem: (
                <Menu.Item key='Classes'>
                    <div className='flex gap-3 '>
                        {classesIcon}
                        <p>
                            Classes
                        </p>
                    </div>
                </Menu.Item >
            ),
            render: () => <Tab.Pane as='div' >
                <Classes />
            </Tab.Pane>,
        },
    ]

    return (
        <div className=''>
            <Tab
                menu={{ secondary: true, pointing: true }}
                // menu={{}}
                panes={panes} />
        </div>
    );
}

export default Main;







const courseIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
</svg>


const levelsIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
</svg>

const plansIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>


const classesIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
</svg>


