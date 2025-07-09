/* eslint-disable react/prop-types */
import { Box, Card, Grid, Typography, Avatar, Button, Stack } from '@mui/material'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Palette from '../../theme/palette'
import Iconify from '../../components/iconify'
import { apipost } from '../../service/api'
import { constant } from '../../constant'

// eslint-disable-next-line arrow-body-style, react/prop-types
const Overview = ({ data, onUpdatePhoto }) => {
  const [uploading, setUploading] = useState(false);

  const handlePhotoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Por favor selecciona una imagen válida');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('La imagen debe ser menor a 5MB');
      return;
    }

    setUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('photo', file);
      
      const response = await apipost(`user/update-photo/${data._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response && response.status === 200) {
        toast.success('Foto de perfil actualizada exitosamente');
        if (onUpdatePhoto) {
          onUpdatePhoto(response.data.photoURL);
        }
        // Force page reload to update all avatar instances
        window.location.reload();
      } else {
        toast.error('Error al actualizar la foto de perfil');
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast.error('Error al subir la imagen');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <Card style={{ borderTopLeftRadius: "0px", borderTopRightRadius: "0px" }}>
        <Box p={3}>
          <Grid container display="flex" spacing={4}>
            {/* Profile Photo Section */}
            <Grid item xs={12} sm={12} sx={{ mb: 3 }}>
              <Stack direction="row" spacing={3} alignItems="center" 
                sx={{ 
                  p: 2, 
                  borderRadius: 1, 
                  bgcolor: 'background.neutral',
                  border: `1px dashed ${Palette.grey[400]}`
                }}>
                <Avatar 
                  src={data?.photoURL ? `${constant.baseUrl}${data.photoURL}` : '/assets/images/avatars/avatar_default.jpg'} 
                  alt={`${data?.firstName} ${data?.lastName}`}
                  sx={{ 
                    width: 80, 
                    height: 80,
                    border: `3px solid ${Palette.primary.main}`,
                    boxShadow: 3
                  }}
                />
                <Stack spacing={1}>
                  <Typography variant="h6" color="primary.main">
                    Foto de Perfil
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Formatos permitidos: JPG, PNG, GIF (máx. 5MB)
                  </Typography>
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="profile-photo-upload"
                    type="file"
                    onChange={handlePhotoUpload}
                  />
                  <label htmlFor="profile-photo-upload">
                    <Button 
                      variant="outlined" 
                      component="span"
                      disabled={uploading}
                      startIcon={<Iconify icon={uploading ? "eos-icons:loading" : "eva:camera-fill"} />}
                      sx={{
                        borderColor: 'primary.main',
                        color: 'primary.main',
                        '&:hover': {
                          borderColor: 'primary.dark',
                          bgcolor: 'primary.lighter'
                        }
                      }}
                    >
                      {uploading ? 'Subiendo...' : 'Cambiar Foto'}
                    </Button>
                  </label>
                </Stack>
              </Stack>
            </Grid>
            
            {/* User Information */}
            <Grid item xs={12} sm={6}>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} pb={2}>
                <Typography variant="body1">First Name :</Typography>
                <Typography variant="body2" color={Palette.grey[600]} textTransform={"capitalize"}>{data?.firstName ? data?.firstName : "---"}</Typography>
              </Grid>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1">Email :</Typography>
                <Typography variant="body2" color={Palette.grey[600]}>{data?.emailAddress ? data?.emailAddress : "---"}</Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} pb={2}>
                <Typography variant="body1">Last Name :</Typography>
                <Typography variant="body2" color={Palette.grey[600]} textTransform={"capitalize"}>{data?.lastName ? data?.lastName : "---"}</Typography>
              </Grid>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1">Role :</Typography>
                <Typography variant="body2" color={Palette.grey[600]} textTransform={"capitalize"}>{data?.role ? data?.role : "---"}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </div>
  )
}

export default Overview
