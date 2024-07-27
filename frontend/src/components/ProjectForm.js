// ProjectForm.js
import React from 'react';

// ! Check the Project model and add validation to this form for int fields

const ProjectForm = ({ projectData, handleChange, handleContributionTypeChange, handleSubmit, handleFileChange }) => {
  return (
    <form onSubmit={handleSubmit}>
      {/* Poster URL */}
      <div className="form-group">
        <label>Project Poster</label>
        <input type="file" className="form-control" onChange={handleFileChange} />
      </div>

      {/* Project Name */}
      <div className="form-group">
        <label>Project Name</label>
        <input className="form-control" name="name" value={projectData.name} onChange={handleChange} />
      </div>

      {/* Description */}
      <div className="form-group">
        <label>Description</label>
        <textarea className="form-control" name="description" value={projectData.description} onChange={handleChange} />
      </div>

      {/* Progress */}
      <div className="form-group">
        <label>Progress Made</label>
        <input className="form-control" name="progress" value={projectData.progress} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Target Amount</label>
        <input
          className="form-control"
          type="number"
          name="targetAmount"
          placeholder='Please enter a number'
          value={projectData.targetAmount}
          onChange={handleChange}
          min="0" // Optional: ensures no negative values
        />
      </div>

      {/* Smallest Token Amount */}
      <div className="form-group">
        <label>Smallest Token Amount</label>
        <input
          className="form-control"
          type="number"
          placeholder='Please enter a number'
          name="smallestTokenAmount"
          value={projectData.smallestTokenAmount}
          onChange={handleChange}
          min="10" // Optional: ensures no negative values
        />
      </div>

      {/* Country */}
      <div className="form-group">
        <label>Country</label>
        <input className="form-control" name="country" value={projectData.country} onChange={handleChange} />
      </div>

      {/* Project Start Date */}
      <div className="form-group">
          <label>Project Start Date</label>
          <input className="form-control" type="date" name="projectStartDate" value={projectData.projectStartDate} onChange={handleChange} />
        </div>

        {/* Project End Date */}
        <div className="form-group">
          <label>Project End Date</label>
          <input className="form-control" type="date" name="projectEndDate" value={projectData.projectEndDate} onChange={handleChange} />
        </div>

      {/* Tags */}
      <div className="form-group">
        <label>Tags</label>
        <div className="checkbox-group">
          {['drama', 'crime', 'mystery', 'romance', 'documentary', 'rom-com', 'politics', 'war', 'other'].map(tag => (
            <div key={tag}>
              <input
                type="checkbox"
                name="tags"
                value={tag}
                checked={projectData.tags.includes(tag)}
                onChange={handleChange}
              />
              <label>{tag}</label>
            </div>
          ))}
        </div>
      </div>
      <br></br>

      {/* Status */}
      <div className="form-group">
        <label>Status</label>
        <select className="form-control" name="status" value={projectData.status} onChange={handleChange}>
          <option value="draft">Draft</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </div>

      {/* Contribution Details */}
      <div className="form-group">
        <label>Contribution Type</label>
        <select
          className="form-control"
          name="contributionDetails.type"
          value={projectData.contributionDetails.type}
          onChange={handleContributionTypeChange}
        >
          <option value="">Select Type</option>
          <option value="bank">Bank</option>
          <option value="mpesa">Mpesa</option>
          <option value="juice">Juice</option>
        </select>
      </div>
      {projectData.contributionDetails.type === 'bank' && (
        <div>
          <div className="form-group">
            <label>Account Name</label>
            <input
              type="text"
              className="form-control"
              name="contributionDetails.accountName"
              value={projectData.contributionDetails.accountName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Account Number</label>
            <input
              type="number"
              className="form-control"
              name="contributionDetails.accountNumber"
              value={projectData.contributionDetails.accountNumber}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>SWIFT Code</label>
            <input
              type="text"
              className="form-control"
              name="contributionDetails.swiftCode"
              value={projectData.contributionDetails.swiftCode}
              onChange={handleChange}
            />
          </div>
        </div>
      )}
      {(projectData.contributionDetails.type === 'mpesa' || projectData.contributionDetails.type === 'juice') && (
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="number"
            className="form-control"
            name="contributionDetails.phoneNumber"
            value={projectData.contributionDetails.phoneNumber}
            onChange={handleChange}
          />
        </div>
      )}

      {/* Smart Contract Details */}
      <div className="form-group">
        <label>Payout Date</label>
        <input
          type="date"
          className="form-control"
          name="smartContractDetails.payoutDate"
          value={projectData.smartContractDetails.payoutDate}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Percentage Paid Out to Investors (%)</label>
        <input
          type="number"
          className="form-control"
          name="smartContractDetails.percentagePaidOut"
          value={projectData.smartContractDetails.percentagePaidOut}
          onChange={handleChange}
          min="0"
          max="100"
        />
      </div>
      <div className="form-group">
        <label>Flop Plan</label>
        <textarea
          className="form-control"
          name="smartContractDetails.flopPlan"
          value={projectData.smartContractDetails.flopPlan}
          onChange={handleChange}
        ></textarea>
      </div>

      {/* Risk */}
      <div className="form-group">
        <label>Risk</label>
        <select className="form-control" name="risk" value={projectData.risk} onChange={handleChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary btn-block">Create Project</button>
    </form>
  );
};

export default ProjectForm;
