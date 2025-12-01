import { useEffect, useState } from 'react';
import { apiClient } from '../api/apiClient';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PageHeader from '../components/PageHeader';

export default function ManageClubMembers() {
  const { id } = useParams();
  const { user } = useAuth();
  const [members, setMembers] = useState([]);
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadData();
  }, [id]);

  function loadData() {
    // Fetch club info
    apiClient.get(`/clubs/${id}`).then(res => {
      if (res && res.id) setClub(res);
    }).catch(e => console.error('Error fetching club:', e));

    // Fetch members
    setLoading(true);
    apiClient.get(`/clubs/${id}/members`).then(res => {
      if (Array.isArray(res)) setMembers(res);
      else setError(res.message || 'Failed to load members');
      setLoading(false);
    }).catch(e => {
      setError(e.message || 'Failed to load members');
      setLoading(false);
    });
  }
