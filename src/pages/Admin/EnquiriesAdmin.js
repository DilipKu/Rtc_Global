import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabaseClient';
import './Admin.css';

const EnquiriesAdmin = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error) {
      setEnquiries(data);
    } else {
      console.error("Error fetching enquiries:", error);
    }
    setLoading(false);
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from('enquiries')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      
      // Update local state
      setEnquiries(prev => prev.map(enq => enq.id === id ? { ...enq, status: newStatus } : enq));
    } catch (err) {
      alert('Failed to update status.');
      console.error(err);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'New': return 'badge-inactive';
      case 'In Progress': return 'badge-active';
      case 'Completed': return 'badge-active';
      case 'Rejected': return 'badge-inactive';
      default: return 'badge-inactive';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="admin-container">
      <div className="admin-content">
        <h1 className="admin-header">Customer Enquiries</h1>
        
        {/* Modal for viewing detailed message */}
        {selectedEnquiry && (
          <div className="admin-modal-overlay" onClick={() => setSelectedEnquiry(null)}>
            <div className="admin-modal" onClick={e => e.stopPropagation()}>
              <h2>Enquiry Details</h2>
              <div className="admin-modal-body">
                <p><strong>Name:</strong> {selectedEnquiry.contact_name}</p>
                <p><strong>Company:</strong> {selectedEnquiry.company_name || 'N/A'}</p>
                <p><strong>Email:</strong> {selectedEnquiry.email}</p>
                <p><strong>Phone:</strong> {selectedEnquiry.phone}</p>
                <p><strong>Subject:</strong> {selectedEnquiry.subject}</p>
                <p><strong>Date:</strong> {formatDate(selectedEnquiry.created_at)}</p>
                <hr style={{margin: '15px 0'}} />
                <p><strong>Message / Quantity:</strong></p>
                <pre style={{whiteSpace: 'pre-wrap', background: '#f5f5f5', padding: '10px', borderRadius: '4px', border: '1px solid #ddd'}}>
                  {selectedEnquiry.message}
                </pre>
              </div>
              <div className="admin-modal-footer">
                <button className="admin-btn-secondary" onClick={() => setSelectedEnquiry(null)}>Close</button>
              </div>
            </div>
          </div>
        )}

        <div className="admin-card">
          {loading ? <p>Loading enquiries...</p> : (
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Phone / Email</th>
                    <th>Subject</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((enq) => (
                    <tr key={enq.id}>
                      <td className="text-muted" style={{fontSize: '0.85rem'}}>{formatDate(enq.created_at)}</td>
                      <td className="text-bold">{enq.contact_name}</td>
                      <td>
                        <div style={{fontSize: '0.9rem'}}>{enq.phone}</div>
                        <div className="text-muted" style={{fontSize: '0.8rem'}}>{enq.email}</div>
                      </td>
                      <td>{enq.subject}</td>
                      <td>
                        <select 
                          value={enq.status} 
                          onChange={(e) => updateStatus(enq.id, e.target.value)}
                          className={`admin-select ${getStatusBadgeClass(enq.status)}`}
                          style={{padding: '4px 8px', borderRadius: '4px', border: '1px solid #ccc', background: 'white'}}
                        >
                          <option value="New">New</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                      <td>
                        <button type="button" onClick={() => setSelectedEnquiry(enq)} className="action-link action-edit">View Message</button>
                      </td>
                    </tr>
                  ))}
                  {enquiries.length === 0 && (
                    <tr><td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }} className="text-muted">No enquiries found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnquiriesAdmin;
