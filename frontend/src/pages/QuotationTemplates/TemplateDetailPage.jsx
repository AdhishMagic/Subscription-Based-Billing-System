/* ==========================================================================
   TEMPLATE DETAIL PAGE
   Standalone preview page for a specific quotation template.
   Accessible via /quotation-templates/:id
   ========================================================================== */

import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HiOutlineArrowLeft } from 'react-icons/hi2';
import useQuotationTemplates from '../../hooks/useQuotationTemplates';
import TemplatePreview from './components/TemplatePreview';
import './TemplateDetailPage.css';

const TemplateDetailPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { getTemplateById } = useQuotationTemplates();

    const template = getTemplateById(id);

    const handleBack = useCallback(() => {
        navigate('/quotation-templates');
    }, [navigate]);

    if (!template) {
        return (
            <div className="template-detail" id="template-detail-page">
                <header className="template-detail__header">
                    <button className="template-detail__back-btn" onClick={handleBack}>
                        <HiOutlineArrowLeft />
                    </button>
                    <div>
                        <h1 className="template-detail__heading">Template Not Found</h1>
                    </div>
                </header>
                <p className="template-detail__not-found">
                    The requested template could not be found. It may have been deleted.
                </p>
            </div>
        );
    }

    return (
        <div className="template-detail" id="template-detail-page">
            <header className="template-detail__header">
                <button className="template-detail__back-btn" onClick={handleBack}>
                    <HiOutlineArrowLeft />
                </button>
                <div>
                    <h1 className="template-detail__heading">Template Preview</h1>
                    <p className="template-detail__subheading">
                        Professional preview of "{template.name}"
                    </p>
                </div>
            </header>

            <TemplatePreview template={template} />
        </div>
    );
};

export default TemplateDetailPage;
