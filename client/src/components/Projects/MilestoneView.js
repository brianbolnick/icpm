import React, { Component } from 'react';
import SisCard from './SisCard';
import AuthCard from './AuthCard';
import BrandingCard from './BrandingCard';
import MigrationCard from './MigrationCard';
import OtherCard from './OtherCard';

class MilestoneContent extends Component {

    render() {
        const { data, active } = this.props;

        return (

            <div className={active === "tasks" ? "task-container" : "project-hidden"}>
                {/* {data && data.milestones ? <OtherCard data={data.milestones.other} /> : null}                        */}
                {data && data.milestones ? <SisCard data={data.milestones.sis} sisType={data.sis} /> : null}
                {data && data.milestones ? <BrandingCard data={data.milestones.branding} /> : null}
                {data && data.milestones ? <AuthCard data={data.milestones.authentication} authType={data.auth_type} /> : null}
                {data && data.milestones ? <MigrationCard data={data.milestones.migration} legacyLms={data.legacy_lms} /> : null}
                {data && data.milestones ? <OtherCard data={data.milestones.other} /> : null}

            </div>
        );
    }
}

export default MilestoneContent;